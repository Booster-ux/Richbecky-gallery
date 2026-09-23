export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, html, text, from } = req.body || {};
  if (!to || !subject || (!html && !text)) {
    return res.status(400).json({ error: 'Missing required email fields (to, subject, html/text).' });
  }

  const apiKey = process.env.RESEND_API_KEY || '';
  const defaultSender = 'Richbecky Gallery <orders@richbeckygallery.com>';
  const sender = from || process.env.VITE_RESEND_FROM_EMAIL || defaultSender;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: sender,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html || undefined,
        text: text || undefined
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Resend API error:', data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Email dispatch exception:', error);
    return res.status(500).json({ error: error.message || 'Email dispatch failed' });
  }
}
