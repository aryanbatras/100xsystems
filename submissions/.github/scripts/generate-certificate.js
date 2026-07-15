#!/usr/bin/env node

/**
 * Certificate Generator for 100xSystems
 *
 * Generates:
 *   1. certificate.pdf — A printable certificate PDF
 *   2. certificate-meta.json — Verification metadata for the website
 *
 * Usage:
 *   node generate-certificate.js \
 *     --system "claude-code" \
 *     --author "aryan" \
 *     --language "typescript" \
 *     --repo "https://github.com/user/repo" \
 *     --pr "42" \
 *     --sha "abc123..."
 */

const fs = require('fs');
const path = require('path');

// Parse arguments
const args = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 2) {
  const key = argv[i].replace(/^--/, '');
  args[key] = argv[i + 1];
}

const {
  system = 'unknown',
  author = 'unknown',
  language = 'unknown',
  repo = '',
  pr = '0',
  sha = '',
} = args;

const certificateId = `${system}-${author}-${pr}`;
const date = new Date().toISOString().split('T')[0];

// ═══════════════════════════════════════════════════════════════════
//  Certificate Metadata JSON
// ═══════════════════════════════════════════════════════════════════

const metadata = {
  id: certificateId,
  system,
  author,
  language,
  repositoryUrl: repo,
  prNumber: parseInt(pr, 10) || 0,
  mergeSha: sha,
  issuedAt: date,
  verified: true,
  issuer: '100xSystems',
};

fs.writeFileSync('certificate-meta.json', JSON.stringify(metadata, null, 2) + '\n');
console.log(`✓ Generated certificate metadata: ${certificateId}`);

// ═══════════════════════════════════════════════════════════════════
//  Certificate HTML (for PDF generation or static page)
// ═══════════════════════════════════════════════════════════════════

const certificateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Certificate — ${system} by ${author}</title>
  <style>
    @page { margin: 0; size: landscape; }
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      background: #faf9f6;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 40px;
    }

    .certificate {
      width: 1000px;
      height: 700px;
      background: white;
      border: 3px solid #1a1a2e;
      padding: 50px;
      position: relative;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }

    .certificate::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border: 1px solid #1a1a2e;
      pointer-events: none;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
    }

    .header h1 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #666;
      margin-bottom: 5px;
    }

    .header .title {
      font-size: 36px;
      font-weight: bold;
      color: #1a1a2e;
      letter-spacing: 2px;
    }

    .body {
      text-align: center;
      margin: 40px 0;
    }

    .body .presented {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }

    .body .name {
      font-size: 42px;
      font-weight: bold;
      color: #1a1a2e;
      margin-bottom: 10px;
      font-family: 'Georgia', serif;
    }

    .body .completed {
      font-size: 18px;
      color: #444;
      margin-bottom: 5px;
    }

    .body .system-name {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a2e;
      margin-bottom: 8px;
    }

    .body .language {
      font-size: 16px;
      color: #666;
      margin-bottom: 20px;
    }

    .body .description {
      font-size: 14px;
      color: #888;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .details {
      display: flex;
      justify-content: center;
      gap: 60px;
      margin: 30px 0;
      font-size: 13px;
      color: #666;
    }

    .details .detail {
      text-align: center;
    }

    .details .detail strong {
      display: block;
      font-size: 14px;
      color: #1a1a2e;
      margin-bottom: 3px;
    }

    .footer {
      position: absolute;
      bottom: 40px;
      left: 50px;
      right: 50px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
      color: #888;
    }

    .footer .id {
      font-family: monospace;
    }

    .footer .seal {
      text-align: center;
    }

    .footer .seal .stamp {
      display: inline-block;
      border: 2px solid #1a1a2e;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 11px;
      font-weight: bold;
      color: #1a1a2e;
      text-transform: uppercase;
      letter-spacing: 1px;
      opacity: 0.8;
    }

    .verify-url {
      font-family: monospace;
      font-size: 11px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="header">
      <h1>100xSystems</h1>
      <div class="title">Certificate of Completion</div>
    </div>

    <div class="body">
      <div class="presented">This certifies that</div>
      <div class="name">${author}</div>
      <div class="completed">has successfully completed</div>
      <div class="system-name">${system}</div>
      <div class="language">${language}</div>
      <div class="description">
        This implementation has been reviewed and accepted by the community.
        The review package and implementation demonstrate understanding of
        system architecture, engineering decisions, and trade-off analysis.
      </div>
    </div>

    <div class="details">
      <div class="detail">
        <strong>Date</strong>
        ${date}
      </div>
      <div class="detail">
        <strong>PR #${pr}</strong>
        <a href="${repo}" style="color: #666;">Repository</a>
      </div>
      <div class="detail">
        <strong>ID</strong>
        ${certificateId}
      </div>
    </div>

    <div class="footer">
      <div>
        <div class="id">ID: ${certificateId}</div>
        <div class="verify-url">Verify: https://100xsystems.dev/verify/${certificateId}</div>
      </div>
      <div class="seal">
        <div class="stamp">100x<br>Verified</div>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('certificate.html', certificateHtml);
console.log(`✓ Generated certificate HTML`);

// Try to generate PDF using Puppeteer if available
async function generatePdf() {
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(certificateHtml, { waitUntil: 'networkidle0' });
    await page.pdf({
      path: 'certificate.pdf',
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    await browser.close();
    console.log('✓ Generated certificate PDF: certificate.pdf');
  } catch (err) {
    console.log('  (PDF generation requires puppeteer — HTML file created instead)');
    console.log('  Install with: npm install puppeteer');
  }
}

generatePdf().catch(console.error);
