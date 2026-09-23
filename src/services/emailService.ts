import { Order, ArtistApplication, Artwork } from '../types';

export const ADMIN_NOTIFICATION_EMAIL =
  (import.meta as any).env?.VITE_ADMIN_NOTIFICATION_EMAIL || 'richbeckygallery@gmail.com';

const RESEND_API_KEY =
  (import.meta as any).env?.VITE_RESEND_API_KEY ||
  (import.meta as any).env?.RESEND_API_KEY ||
  '';

export class EmailService {
  /**
   * Internal dispatcher that tries Vercel Serverless `/api/send-email` first,
   * then falls back to direct Resend API if running in an environment with direct fetch allowed.
   */
  private static async send(payload: {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
  }): Promise<boolean> {
    try {
      // 1. Try Vercel Serverless endpoint
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log(`✅ [Resend] Transactional email sent to:`, payload.to);
        return true;
      }
    } catch (e) {
      console.warn('Serverless email endpoint unreachable, attempting direct Resend fallback...', e);
    }

    // 2. Direct Resend fallback
    try {
      const directRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: payload.from || 'Richbecky Gallery <orders@richbeckygallery.com>',
          to: Array.isArray(payload.to) ? payload.to : [payload.to],
          subject: payload.subject,
          html: payload.html
        })
      });

      if (directRes.ok) {
        console.log(`✅ [Resend Direct] Email delivered to:`, payload.to);
        return true;
      }
    } catch (err) {
      console.error('❌ [Resend Error] Email dispatch failed:', err);
    }

    return false;
  }

  // =========================================================================
  // 1. ORDER PURCHASE CONFIRMATION (To Collector)
  // =========================================================================
  public static async sendOrderConfirmation(order: Order, customerEmail: string): Promise<boolean> {
    const itemsHtml = order.items
      .map(
        item => `
        <tr style="border-bottom: 1px solid #e5e5e5;">
          <td style="padding: 12px 0;">
            <strong style="color: #0F2537; font-size: 14px;">${item.artwork.title}</strong><br/>
            <span style="color: #737373; font-size: 12px;">by ${item.artwork.artistName} • ${item.artwork.artworkType}</span>
          </td>
          <td style="padding: 12px 0; text-align: center; color: #525252; font-size: 13px;">Qty: ${item.quantity}</td>
          <td style="padding: 12px 0; text-align: right; color: #0F2537; font-weight: bold; font-size: 14px;">
            ${order.displayCurrency} ${item.applicableDisplayedPrice.toLocaleString()}
          </td>
        </tr>
      `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #171717; margin: 0; padding: 30px 10px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #E5E0D8; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background-color: #0F2537; color: #ffffff; padding: 35px 30px; text-align: center; border-bottom: 3px solid #D4AF37; }
          .header h1 { font-family: 'Cinzel', Georgia, serif; margin: 0; font-size: 24px; letter-spacing: 2px; color: #FAF8F5; }
          .header p { color: #D4AF37; margin: 6px 0 0 0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; }
          .body { padding: 35px 30px; }
          .badge { display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
          .order-box { background-color: #FAF8F5; border-radius: 12px; padding: 18px; margin: 20px 0; border: 1px solid #E5E0D8; }
          .coa-notice { background-color: #FAF8F5; border-left: 4px solid #D4AF37; padding: 14px 18px; margin: 25px 0; border-radius: 0 8px 8px 0; }
          .footer { background-color: #f5f5f4; padding: 25px 30px; text-align: center; font-size: 11px; color: #737373; border-top: 1px solid #e7e5e4; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>RICHBECKY GALLERY</h1>
            <p>Official Acquisition Confirmation</p>
          </div>
          <div class="body">
            <span class="badge">Order Confirmed • #${order.id.slice(0, 8).toUpperCase()}</span>
            <h2 style="font-size: 20px; color: #0F2537; margin-top: 12px;">Thank you for your acquisition</h2>
            <p style="color: #525252; font-size: 13px; line-height: 1.6;">
              Dear Collector,<br/><br/>
              Your acquisition request has been registered with the curatorial team. Our fine art handlers are currently inspecting and packaging your piece for white-glove insured transit.
            </p>

            <div class="order-box">
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="padding-top: 15px; color: #737373; font-size: 12px;">Shipping Fee:</td>
                  <td style="padding-top: 15px; text-align: right; color: #0F2537; font-size: 12px;">${order.displayCurrency} ${order.shippingFee.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 6px; font-weight: bold; color: #0F2537; font-size: 16px;">Total Settlement:</td>
                  <td style="padding-top: 6px; text-align: right; font-weight: bold; color: #D4AF37; font-size: 18px;">${order.displayCurrency} ${order.total.toLocaleString()}</td>
                </tr>
              </table>
            </div>

            <div class="coa-notice">
              <strong style="color: #0F2537; font-size: 13px;">🛡️ Certificate of Authenticity Guarantee</strong>
              <p style="margin: 4px 0 0 0; color: #525252; font-size: 12px; line-height: 1.5;">
                Every original piece arrives sealed with an official physical Certificate of Authenticity signed by the artist and verified by Richbecky Gallery Directors.
              </p>
            </div>

            <p style="color: #737373; font-size: 12px; line-height: 1.5;">
              <strong>Delivery Address:</strong><br/>
              ${order.shippingAddress.fullName}<br/>
              ${order.shippingAddress.address}, ${order.shippingAddress.city}<br/>
              ${order.shippingAddress.country} • Phone: ${order.shippingAddress.phone}
            </p>
          </div>
          <div class="footer">
            <p style="margin: 0;">Richbecky Gallery • Fine Art Marketplace & Global Contemporary Archives</p>
            <p style="margin: 4px 0 0 0;">Inquiries: concierge@richbeckygallery.com • richbeckygallery.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.send({
      to: customerEmail,
      subject: `Acquisition Receipt #${order.id.slice(0, 8).toUpperCase()} — Richbecky Gallery`,
      html
    });
  }

  // =========================================================================
  // 2. NEW ORDER ALERT (To Gallery Admin / Gmail)
  // =========================================================================
  public static async sendAdminOrderAlert(order: Order): Promise<boolean> {
    const itemsList = order.items
      .map(i => `• ${i.artwork.title} by ${i.artwork.artistName} (Qty: ${i.quantity}) - ${order.displayCurrency} ${i.applicableDisplayedPrice.toLocaleString()}`)
      .join('<br/>');

    const html = `
      <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0F2537; margin-top: 0;">🔔 New Collector Order Received!</h2>
        <p><strong>Order Reference:</strong> #${order.id}</p>
        <p><strong>Total Amount:</strong> ${order.displayCurrency} ${order.total.toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;"/>
        <h3 style="color: #0F2537; font-size: 15px;">Purchased Artworks:</h3>
        <p style="font-size: 14px; line-height: 1.6;">${itemsList}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;"/>
        <h3 style="color: #0F2537; font-size: 15px;">Customer & Shipping Details:</h3>
        <p style="font-size: 13px; line-height: 1.5;">
          <strong>Name:</strong> ${order.shippingAddress.fullName}<br/>
          <strong>Email:</strong> ${order.shippingAddress.email}<br/>
          <strong>Phone:</strong> ${order.shippingAddress.phone}<br/>
          <strong>Address:</strong> ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}
        </p>
        <p style="margin-top: 25px;">
          <a href="https://richbeckygallery.com/#admin-login" style="background-color: #0F2537; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
            Open Executive Admin Dashboard →
          </a>
        </p>
      </div>
    `;

    return this.send({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `🚨 New Sale Alert: Order #${order.id.slice(0, 8).toUpperCase()} (${order.displayCurrency} ${order.total.toLocaleString()})`,
      html
    });
  }

  // =========================================================================
  // 3. ARTIST APPLICATION RECEIVED (To Artist Applicant)
  // =========================================================================
  public static async sendArtistApplicationReceived(applicant: {
    fullName: string;
    email: string;
    artistName?: string;
  }): Promise<boolean> {
    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #E5E0D8; border-radius: 12px; color: #171717;">
        <h1 style="font-size: 22px; color: #0F2537; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 15px;">RICHBECKY GALLERY</h1>
        <h2 style="font-size: 18px; color: #0F2537; margin-top: 20px;">Curatorial Application Acknowledgment</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          Dear ${applicant.fullName || applicant.artistName || 'Artist'},<br/><br/>
          Thank you for submitting your portfolio for representation at Richbecky Gallery.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          Our curatorial committee reviews all submissions carefully to ensure alignment with our museum-grade standards and contemporary vision. You will receive an official decision via email within <strong>3–5 business days</strong>.
        </p>
        <div style="background-color: #FAF8F5; padding: 15px; border-radius: 8px; border-left: 3px solid #0F2537; margin: 20px 0; font-size: 13px; color: #525252;">
          <strong>Submission Details:</strong><br/>
          Applicant: ${applicant.fullName} (${applicant.email})<br/>
          Status: <span style="color: #d97706; font-weight: bold;">Under Curatorial Review</span>
        </div>
        <p style="font-size: 12px; color: #737373; text-align: center; margin-top: 30px;">
          Richbecky Gallery Curatorial Directorate • concierge@richbeckygallery.com
        </p>
      </div>
    `;

    return this.send({
      to: applicant.email,
      subject: `Artist Representation Application Received — Richbecky Gallery`,
      html
    });
  }

  // =========================================================================
  // 4. NEW ARTIST APPLICATION ALERT (To Admin / Gmail)
  // =========================================================================
  public static async sendAdminArtistApplicationAlert(applicant: ArtistApplication): Promise<boolean> {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
        <h2 style="color: #0F2537; margin-top: 0;">🎨 New Artist Representation Submission!</h2>
        <p><strong>Artist Name:</strong> ${applicant.fullName} (${applicant.artistName || 'N/A'})</p>
        <p><strong>Email:</strong> ${applicant.email}</p>
        <p><strong>Phone:</strong> ${applicant.phone || 'N/A'}</p>
        <p><strong>Country:</strong> ${applicant.country || 'N/A'}</p>
        <p><strong>Practice Areas:</strong> ${applicant.practiceAreas || 'N/A'}</p>
        <p><strong>Years Active:</strong> ${applicant.yearsActive || 'N/A'}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;"/>
        <h3 style="color: #0F2537; font-size: 14px;">Artist Bio:</h3>
        <p style="font-size: 13px; color: #475569; line-height: 1.5;">${applicant.bio}</p>
        <p style="margin-top: 25px;">
          <a href="https://richbeckygallery.com/#admin-login" style="background-color: #0F2537; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
            Review Application in Admin Console →
          </a>
        </p>
      </div>
    `;

    return this.send({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `🧑‍🎨 New Artist Application: ${applicant.fullName} (${applicant.country || 'International'})`,
      html
    });
  }

  // =========================================================================
  // 5. ARTIST APPLICATION APPROVED / REJECTED (To Artist)
  // =========================================================================
  public static async sendArtistApplicationDecision(
    email: string,
    fullName: string,
    status: 'Approved' | 'Rejected',
    reason?: string
  ): Promise<boolean> {
    const isApproved = status === 'Approved';

    const html = isApproved
      ? `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #E5E0D8; border-radius: 12px; color: #171717;">
        <h1 style="font-size: 22px; color: #0F2537; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 15px;">RICHBECKY GALLERY</h1>
        <h2 style="font-size: 18px; color: #166534; margin-top: 20px;">Congratulations — Artist Representation Approved!</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          Dear ${fullName},<br/><br/>
          We are pleased to inform you that your application for representation at Richbecky Gallery has been approved by our curatorial directorate.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          You can now access the <strong>Artist Studio Portal</strong> to upload your original artworks and limited-edition prints to our global collectors catalogue.
        </p>
        <p style="margin: 25px 0; text-align: center;">
          <a href="https://richbeckygallery.com/#artist-login" style="background-color: #0F2537; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold;">
            Access Artist Studio Portal →
          </a>
        </p>
      </div>
    `
      : `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #E5E0D8; border-radius: 12px; color: #171717;">
        <h1 style="font-size: 22px; color: #0F2537; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 15px;">RICHBECKY GALLERY</h1>
        <h2 style="font-size: 18px; color: #0F2537; margin-top: 20px;">Curatorial Review Update</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          Dear ${fullName},<br/><br/>
          Thank you for sharing your portfolio with Richbecky Gallery. After careful deliberation, our committee is unable to offer representation at this present curation cycle.
        </p>
        ${reason ? `<p style="font-size: 13px; color: #525252; background-color: #FAF8F5; padding: 12px; border-radius: 6px;"><strong>Curatorial Feedback:</strong> ${reason}</p>` : ''}
        <p style="font-size: 13px; color: #737373; margin-top: 20px;">
          We encourage you to continue developing your practice and welcome future submissions in upcoming exhibition seasons.
        </p>
      </div>
    `;

    return this.send({
      to: email,
      subject: `Curatorial Representation Decision: ${status} — Richbecky Gallery`,
      html
    });
  }

  // =========================================================================
  // 6. COLLECTOR WELCOME EMAIL (To Customer)
  // =========================================================================
  public static async sendCustomerWelcome(customer: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<boolean> {
    const html = `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #E5E0D8; border-radius: 12px; color: #171717;">
        <h1 style="font-size: 22px; color: #0F2537; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 15px;">RICHBECKY GALLERY</h1>
        <h2 style="font-size: 18px; color: #0F2537; margin-top: 20px;">Welcome to the Private Collector Circle</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          Dear ${customer.firstName} ${customer.lastName},<br/><br/>
          Thank you for creating your collector account with Richbecky Gallery.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #404040;">
          You can now explore original African contemporary masterpieces, manage multi-currency acquisitions, and track white-glove international courier deliveries.
        </p>
        <p style="margin: 25px 0; text-align: center;">
          <a href="https://richbeckygallery.com/#catalogue" style="background-color: #0F2537; color: #ffffff; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: bold;">
            Explore Art Catalogue →
          </a>
        </p>
        <p style="font-size: 12px; color: #737373; text-align: center; margin-top: 30px;">
          Richbecky Gallery • concierge@richbeckygallery.com
        </p>
      </div>
    `;

    return this.send({
      to: customer.email,
      subject: `Welcome to Richbecky Gallery Private Collector Circle`,
      html
    });
  }

  // =========================================================================
  // 7. COLLECTOR ADVISORY & COA INQUIRY ALERT (To Admin / Gmail)
  // =========================================================================
  public static async sendCollectorEnquiryAlert(enquiry: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    artworkTitle?: string;
  }): Promise<boolean> {
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
        <h2 style="color: #0F2537; margin-top: 0;">💬 New Collector Advisory Enquiry!</h2>
        <p><strong>From:</strong> ${enquiry.name} (${enquiry.email})</p>
        <p><strong>Phone:</strong> ${enquiry.phone || 'N/A'}</p>
        ${enquiry.artworkTitle ? `<p><strong>Referenced Artwork:</strong> ${enquiry.artworkTitle}</p>` : ''}
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;"/>
        <h3 style="color: #0F2537; font-size: 14px;">Inquiry Message:</h3>
        <p style="font-size: 13px; color: #475569; line-height: 1.6; background-color: #f8fafc; padding: 12px; border-radius: 8px;">
          ${enquiry.message}
        </p>
        <p style="margin-top: 20px;">
          <a href="mailto:${enquiry.email}?subject=Richbecky Gallery Advisory Response" style="background-color: #0F2537; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
            Reply to Collector Directly →
          </a>
        </p>
      </div>
    `;

    return this.send({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `📩 New Advisory Enquiry from ${enquiry.name}${enquiry.artworkTitle ? ` regarding "${enquiry.artworkTitle}"` : ''}`,
      html
    });
  }
}
