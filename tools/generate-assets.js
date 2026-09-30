/**
 * Regenerates assets/Muskan_Gupta_Resume.pdf (from resume.html) and
 * assets/og-image.png (from tools/og-template.html) with headless Chrome.
 *
 *   node tools/generate-assets.js
 *
 * Needs playwright-core (npm i -D playwright-core) and Google Chrome installed.
 * Set CHROME_PATH if Chrome lives somewhere else.
 */
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
let pw;
try { pw = require('playwright-core'); }
catch { pw = require('/Users/gauravgupta/WebstormProjects/g-npm-ui/node_modules/playwright-core'); }
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async () => {
  const browser = await pw.chromium.launch({ executablePath: CHROME, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 1400 } });
  const page = await ctx.newPage();

  await page.goto(`file://${ROOT}/resume.html`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(600);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(ROOT, 'assets/Muskan_Gupta_Resume.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('✓ assets/Muskan_Gupta_Resume.pdf');

  await page.emulateMedia({ media: 'screen' });
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto(`file://${ROOT}/tools/og-template.html`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(ROOT, 'assets/og-image.png'), clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('✓ assets/og-image.png');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
