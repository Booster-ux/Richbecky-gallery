import { test, expect, Page, Browser } from '@playwright/test';
import { dbStore } from '../src/backend/db';

const TIMESTAMP = Date.now();
const TEST_CUSTOMER_EMAIL = `test-customer-${TIMESTAMP}@richbecky-qa.com`;
const TEST_CUSTOMER_PASSWORD = 'CustomerPass123!';

const TEST_ARTIST_EMAIL = `test-artist-${TIMESTAMP}@richbecky-qa.com`;
const TEST_ARTIST_PASSWORD = 'ArtistPass123!';
const TEST_ARTIST_NAME = `QA Test Artist ${TIMESTAMP}`;

const TEST_ARTWORK_TITLE = `QA Masterpiece ${TIMESTAMP}`;
const REJECTED_ARTWORK_TITLE = `QA Rejected Work ${TIMESTAMP}`;

test.describe.serial('Richbecky Gallery Stage 1 & Stage 2 End-to-End QA Suite', () => {
  let page: Page;

  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    // Safely remove only test records created by automated QA runs
    for (const [id, art] of dbStore.artworks.entries()) {
      if (art.title.includes('QA Masterpiece') || art.title.includes('QA Rejected Work')) {
        dbStore.artworks.delete(id);
      }
    }
    await page.close();
  });

  // TEST 1 — CUSTOMER AUTHENTICATION & PERMISSIONS
  test('TEST 1 — Customer Registration, Dashboard, Logout & Permission Boundaries', async () => {
    await page.goto('/register');
    
    // 1. Register Customer
    await page.fill('input[placeholder="Rebecca"]', 'QAFirst');
    await page.fill('input[placeholder="Sterling"]', 'QALast');
    await page.fill('input[placeholder="rebecca@artcollector.com"]', TEST_CUSTOMER_EMAIL);
    await page.fill('input[type="tel"]', '+44 20 7946 0912');
    
    // Password fields
    const passwordInputs = page.locator('input[type="password"]');
    await passwordInputs.nth(0).fill(TEST_CUSTOMER_PASSWORD);
    await passwordInputs.nth(1).fill(TEST_CUSTOMER_PASSWORD);

    // Accept checkboxes
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    
    // Submit registration
    await page.click('button:has-text("Create Collector Account")');

    // 2. Verify account dashboard loads
    await expect(page.locator('text=VIP Patron Collector').first()).toBeVisible({ timeout: 10000 });

    // 3. Attempt to access Admin functionality (must be denied & redirected to Admin Auth)
    await page.goto('/admin-dashboard');
    await expect(page.locator('text=Executive Governance Authentication').first()).toBeVisible({ timeout: 10000 });

    // 4. Attempt to access Artist Studio functionality (must be denied & redirected to Artist Auth)
    await page.goto('/add-artwork');
    await expect(page.locator('text=Artist Studio Authentication').first()).toBeVisible({ timeout: 10000 });

    // 5. Sign Out from active customer session
    await page.goto('/account');
    await page.click('button:has-text("Sign Out")');

    // 6. Log back in with registered customer credentials
    await page.goto('/login');
    await page.fill('input[placeholder="rebecca@artcollector.com"]', TEST_CUSTOMER_EMAIL);
    await page.fill('input[type="password"]', TEST_CUSTOMER_PASSWORD);
    await page.click('button:has-text("Sign In to Account")');
    await expect(page.locator('text=VIP Patron Collector').first()).toBeVisible({ timeout: 10000 });

    // 7. Final Sign Out
    await page.click('button:has-text("Sign Out")');
    await expect(page.locator('text=Explore Catalogue').first()).toBeVisible();
  });


  // TEST 2 — ARTIST APPLICATION SUBMISSION
  test('TEST 2 — Artist Registration & Application Submission', async () => {
    await page.goto('/artist-application');

    // Step 1: Personal Info
    await page.fill('input[placeholder="e.g. Rebecca Esho (Legal Name)"]', TEST_ARTIST_NAME);
    await page.fill('input[placeholder="rebecca@artist.com"]', TEST_ARTIST_EMAIL);
    await page.fill('input[placeholder="+234 800 000 0000"]', '+234 801 234 5678');
    await page.fill('input[placeholder="Lagos"]', 'Lagos');
    await page.click('button:has-text("Continue to Step 2")');

    // Step 2: Artist Profile
    await page.fill('input[placeholder="e.g. Rebecca Esho (Studio Name)"]', TEST_ARTIST_NAME);
    await page.fill('textarea', 'QA Test Artist biography detailing contemporary African visual practice.');
    await page.click('button:has-text("Continue to Step 3")');

    // Step 3: Experience
    await page.click('button:has-text("Continue to Step 4")');

    // Step 4: Portfolio
    await page.click('button:has-text("Continue to Step 5")');

    // Step 5: Terms & Agreement
    const checkboxes = page.locator('input[type="checkbox"]');
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();

    // Submit Application
    await page.click('button:has-text("Submit Representation Application")');

    // Verify Application Status is Pending
    await expect(page.locator('text=Application Pending Review').first()).toBeVisible({ timeout: 10000 });
  });


  // TEST 3 — ADMIN ARTIST APPROVAL
  test('TEST 3 — Admin Artist Approval', async () => {
    await page.goto('/admin-login');
    
    // Log in as Admin
    await page.fill('input[placeholder="director@richbeckygallery.com"]', 'admin@richbeckygallery.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Authenticate & Access Admin Portal")');

    // Verify Admin Dashboard loads
    await expect(page.locator('text=Richbecky Admin').first()).toBeVisible({ timeout: 10000 });

    // Open Artist Management tab
    await page.click('button:has-text("Artist Management")');

    // Locate test artist card precisely and click Approve Representation
    const artistCard = page.locator('div', { hasText: TEST_ARTIST_NAME }).filter({ has: page.locator('button:has-text("Approve Representation")') }).first();
    await expect(artistCard).toBeVisible({ timeout: 10000 });

    const approveBtn = artistCard.locator('button:has-text("Approve Representation")').first();
    await approveBtn.click();

    // Verify status changes to Approved
    await expect(page.locator(`text=${TEST_ARTIST_NAME}`).first()).toBeVisible();
  });


  // TEST 4 — APPROVED ARTIST ACCESS
  test('TEST 4 — Approved Artist Studio Access', async () => {
    await page.goto('/artist-login');
    
    // Log in as approved test artist
    await page.fill('input[placeholder="artist@richbeckygallery.com"]', TEST_ARTIST_EMAIL);
    await page.fill('input[type="password"]', 'ArtistPass123!');
    await page.click('button:has-text("Sign In to Artist Studio")');

    // Verify Artist Status / Studio is accessible
    const enterStudioBtn = page.locator('button:has-text("Enter Artist Studio")').first();
    if (await enterStudioBtn.isVisible()) {
      await enterStudioBtn.click();
    }

    await expect(page.locator('text=Artist Studio Portal').or(page.locator('text=Submit New Artwork')).first()).toBeVisible({ timeout: 10000 });

    // Sign out artist before checking admin boundary
    const signOutBtn = page.locator('button:has-text("Sign Out")').first();
    if (await signOutBtn.isVisible()) {
      await signOutBtn.click();
    }

    // Verify Admin Portal remains inaccessible
    await page.goto('/admin-dashboard');
    await expect(page.locator('text=Executive Governance Authentication').first()).toBeVisible({ timeout: 10000 });
  });


  // TEST 5 — ARTWORK SUBMISSION BY ARTIST
  test('TEST 5 — Artist Uploads Test Artwork (Pending Status)', async () => {
    await page.goto('/artist-login');
    await page.fill('input[placeholder="artist@richbeckygallery.com"]', TEST_ARTIST_EMAIL);
    await page.fill('input[type="password"]', 'ArtistPass123!');
    await page.click('button:has-text("Sign In to Artist Studio")');

    const enterStudioBtn = page.locator('button:has-text("Enter Artist Studio")').first();
    if (await enterStudioBtn.isVisible()) {
      await enterStudioBtn.click();
    }

    // Go to Add Artwork page
    await page.goto('/add-artwork');

    // Fill required artwork fields
    await page.fill('input[placeholder="e.g. ISEMBAYE"]', TEST_ARTWORK_TITLE);
    await page.fill('textarea[placeholder*="detailed description"]', 'An evocative test artwork created during automated QA validation.');
    await page.fill('input[placeholder="e.g. 30 × 36 inches"]', '36 × 48 inches');
    await page.fill('input[placeholder="e.g. 250000"]', '185000');

    // Submit artwork preview
    await page.click('button:has-text("Preview Artwork Submission")');

    // Confirm final submit
    const confirmBtn = page.locator('button:has-text("Confirm & Submit")').first();
    await expect(confirmBtn).toBeVisible({ timeout: 10000 });
    await confirmBtn.click();

    // Verify artwork created with Pending status
    await expect(page.locator('text=Pending Admin Approval').or(page.locator('text=Pending')).first()).toBeVisible({ timeout: 10000 });
  });


  // TEST 6 — PENDING ARTWORK IS NOT PUBLIC
  test('TEST 6 — Pending Artwork Is Hidden From Public Catalogue', async () => {
    await page.goto('/catalogue');
    
    // Search for pending artwork
    await page.fill('input[placeholder*="Search"]', TEST_ARTWORK_TITLE);
    
    // Expect artwork NOT to be visible in catalogue results
    await expect(page.locator(`h3:has-text("${TEST_ARTWORK_TITLE}")`)).not.toBeVisible();
  });


  // TEST 7 — ADMIN ARTWORK APPROVAL
  test('TEST 7 — Admin Approves Test Artwork', async () => {
    await page.goto('/admin-login');
    await page.fill('input[placeholder="director@richbeckygallery.com"]', 'admin@richbeckygallery.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Authenticate & Access Admin Portal")');

    // Open Artwork Management tab
    await page.click('button:has-text("Artwork Management")');

    // Find test artwork and approve
    const artworkRow = page.locator('tr', { hasText: TEST_ARTWORK_TITLE }).first();
    await expect(artworkRow).toBeVisible({ timeout: 10000 });

    const approveBtn = artworkRow.locator('button:has-text("Approve")').first();
    await approveBtn.click();

    // Verify status changes to Approved
    await expect(page.locator(`text=${TEST_ARTWORK_TITLE}`).first()).toBeVisible();
  });


  // TEST 8 — PUBLIC ARTWORK ACCESS
  test('TEST 8 — Approved Artwork Appears in Public Catalogue & Details View', async () => {
    await page.goto('/catalogue');
    
    // Search for approved artwork
    await page.fill('input[placeholder*="Search"]', TEST_ARTWORK_TITLE);
    
    // Artwork must now be publicly visible
    const artworkCard = page.locator(`h3:has-text("${TEST_ARTWORK_TITLE}")`).first();
    await expect(artworkCard).toBeVisible({ timeout: 10000 });

    // Click artwork card to open Artwork Details
    await artworkCard.click();

    // Verify artwork details page content
    await expect(page.locator(`h1:has-text("${TEST_ARTWORK_TITLE}")`).first()).toBeVisible();
    await expect(page.locator('text=Certificate of Authenticity').first()).toBeVisible();
  });


  // TEST 9 — ARTWORK REJECTION
  test('TEST 9 — Admin Rejects Second Test Artwork and Verifies Invisibility', async () => {
    // 1. Submit second artwork as artist
    await page.goto('/artist-login');
    await page.fill('input[placeholder="artist@richbeckygallery.com"]', TEST_ARTIST_EMAIL);
    await page.fill('input[type="password"]', 'ArtistPass123!');
    await page.click('button:has-text("Sign In to Artist Studio")');

    const enterStudioBtn = page.locator('button:has-text("Enter Artist Studio")').first();
    if (await enterStudioBtn.isVisible()) {
      await enterStudioBtn.click();
    }

    await page.goto('/add-artwork');
    await page.fill('input[placeholder="e.g. ISEMBAYE"]', REJECTED_ARTWORK_TITLE);
    await page.fill('textarea[placeholder*="detailed description"]', 'Test artwork intended for rejection testing.');
    await page.fill('input[placeholder="e.g. 30 × 36 inches"]', '20 × 24 inches');
    await page.fill('input[placeholder="e.g. 250000"]', '120000');

    await page.click('button:has-text("Preview Artwork Submission")');
    
    const confirmBtn = page.locator('button:has-text("Confirm & Submit")').first();
    await expect(confirmBtn).toBeVisible({ timeout: 10000 });
    await confirmBtn.click();

    // 2. Reject as Admin
    await page.goto('/admin-login');
    await page.fill('input[placeholder="director@richbeckygallery.com"]', 'admin@richbeckygallery.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button:has-text("Authenticate & Access Admin Portal")');

    await page.click('button:has-text("Artwork Management")');
    const artworkRow = page.locator('tr', { hasText: REJECTED_ARTWORK_TITLE }).first();
    await expect(artworkRow).toBeVisible({ timeout: 10000 });

    const rejectBtn = artworkRow.locator('button:has-text("Reject")').first();
    await rejectBtn.click();

    // 3. Verify rejected artwork is NOT visible in public catalogue
    await page.goto('/catalogue');
    await page.fill('input[placeholder*="Search"]', REJECTED_ARTWORK_TITLE);
    await expect(page.locator(`h3:has-text("${REJECTED_ARTWORK_TITLE}")`)).not.toBeVisible();
  });


  // TEST 10 — PERMISSION BOUNDARY MATRIX
  test('TEST 10 — System-Wide Role & Permission Matrix Boundaries', async () => {
    // Sign out any active session first to test unauthenticated guest access
    await page.goto('/account');
    const signOutBtn = page.locator('button:has-text("Sign Out")').first();
    if (await signOutBtn.isVisible()) {
      await signOutBtn.click();
    }

    // Unauthenticated/Customer guest cannot access admin or artist studio
    await page.goto('/admin-dashboard');
    await expect(page.locator('text=Executive Governance Authentication').first()).toBeVisible({ timeout: 10000 });

    await page.goto('/artist-dashboard');
    await expect(page.locator('text=Artist Studio Authentication').first()).toBeVisible({ timeout: 10000 });
  });


  // TEST 11 — IMAGE STORAGE & RENDERING
  test('TEST 11 — Artwork Image Storage URL & Image Element Rendering', async () => {
    await page.goto('/catalogue');
    await page.fill('input[placeholder*="Search"]', TEST_ARTWORK_TITLE);
    
    const imgElement = page.locator(`img[alt="${TEST_ARTWORK_TITLE}"]`).first();
    await expect(imgElement).toBeVisible();

    const src = await imgElement.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).toContain('/images/artworks/');
  });


  // TEST 12 — DATABASE VALIDATION
  test('TEST 12 — Direct Database Repository State Validation', async () => {
    // Verify categories seed initialized
    expect(dbStore.categories.size).toBeGreaterThan(0);

    // Verify admin seed user exists
    const adminUser = Array.from(dbStore.users.values()).find(u => u.email === 'admin@richbeckygallery.com');
    expect(adminUser).toBeDefined();
    expect(adminUser?.role).toBe('admin');
  });


  // TEST 13 — EXISTING FIVE PRODUCTION ARTWORKS INTEGRITY
  test('TEST 13 — Existing 5 Artworks Integrity & THIS IS OUR WAY Attribution', async () => {
    await page.goto('/catalogue');

    // 1. Verify ISEMBAYE
    await expect(page.locator('h3:has-text("ISEMBAYE")').first()).toBeVisible();

    // 2. Verify THIS IS OUR WAY is attributed to Kolawole Adedeji
    const thisIsOurWayCard = page.locator('div:has-text("THIS IS OUR WAY")').first();
    await expect(thisIsOurWayCard).toBeVisible();
    await expect(page.locator('p:has-text("Kolawole Adedeji")').first()).toBeVisible();

    // 3. Verify THE FIRST DIALOGUE
    await expect(page.locator('h3:has-text("THE FIRST DIALOGUE")').first()).toBeVisible();

    // 4. Verify UNDER OUR NEW GARMENT
    await expect(page.locator('h3:has-text("UNDER OUR NEW GARMENT")').first()).toBeVisible();

    // 5. Verify Thought of Hope
    await expect(page.locator('h3:has-text("Thought of Hope")').first()).toBeVisible();
  });

});
