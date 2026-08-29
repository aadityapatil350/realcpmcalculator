import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// OG Image — 1200×630
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Left accent bar -->
  <rect x="0" y="0" width="8" height="630" fill="#2563eb"/>

  <!-- Icon circle -->
  <circle cx="100" cy="100" r="44" fill="#2563eb"/>
  <text x="100" y="115" font-family="system-ui,sans-serif" font-size="40" font-weight="700" fill="white" text-anchor="middle">C</text>

  <!-- Site name -->
  <text x="160" y="118" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="#94a3b8">RealCPMCalculator.com</text>

  <!-- Main headline -->
  <text x="80" y="270" font-family="system-ui,sans-serif" font-size="72" font-weight="800" fill="#f1f5f9">CPM Calculator</text>

  <!-- Subheadline -->
  <text x="80" y="340" font-family="system-ui,sans-serif" font-size="34" font-weight="400" fill="#64748b">Solve for spend, impressions, or CPM — any direction.</text>

  <!-- Formula pill -->
  <rect x="80" y="390" width="680" height="72" rx="12" fill="#1e3a5f" stroke="#2563eb" stroke-width="2"/>
  <text x="420" y="435" font-family="ui-monospace,monospace" font-size="28" font-weight="500" fill="#60a5fa" text-anchor="middle">CPM = (Spend ÷ Impressions) × 1,000</text>

  <!-- Right side metrics -->
  <rect x="860" y="200" width="280" height="90" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="1000" y="245" font-family="system-ui,sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Default example</text>
  <text x="1000" y="275" font-family="system-ui,sans-serif" font-size="26" font-weight="700" fill="#3b82f6" text-anchor="middle">$20.00 CPM</text>

  <rect x="860" y="310" width="280" height="90" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="1000" y="355" font-family="system-ui,sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Solve any field</text>
  <text x="1000" y="385" font-family="system-ui,sans-serif" font-size="26" font-weight="700" fill="#3b82f6" text-anchor="middle">Free &amp; instant</text>

  <!-- Bottom bar -->
  <rect x="0" y="590" width="1200" height="40" fill="#1e293b"/>
  <text x="600" y="616" font-family="system-ui,sans-serif" font-size="18" fill="#475569" text-anchor="middle">CPM · CPC · CTR · ROAS · CAC · CPV calculators — all in your browser, nothing stored</text>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .resize(1200, 630)
  .png({ quality: 90 })
  .toFile(join(publicDir, 'og-image.png'));

console.log('✓ og-image.png generated (1200×630)');

// Apple touch icon — 180×180
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#2563eb"/>
  <text x="90" y="125" font-family="system-ui,sans-serif" font-size="96" font-weight="800" fill="white" text-anchor="middle">C</text>
</svg>`;

await sharp(Buffer.from(iconSvg))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));

console.log('✓ apple-touch-icon.png generated (180×180)');

// Favicon PNG fallback — 32×32
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#2563eb"/>
  <text x="16" y="23" font-family="system-ui,sans-serif" font-size="20" font-weight="800" fill="white" text-anchor="middle">C</text>
</svg>`;

await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon-32.png'));

console.log('✓ favicon-32.png generated (32×32)');

console.log('\nAll images generated successfully.');
