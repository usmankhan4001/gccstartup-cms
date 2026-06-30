const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Pages');
const embedsDir = path.join(__dirname, 'embeds');
const destDir = path.join(__dirname, 'site');

// Ensure site directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// URL Mapping
const routes = {
  'index.html': '',
  'country-uae.html': 'uae',
  'country-bahrain.html': 'bahrain',
  'country-hongkong.html': 'hongkong',
  'country-singapore.html': 'singapore',
  'country-ireland.html': 'ireland',
  'country-bvi-cayman.html': 'bvi-cayman',
  'service-company-registration.html': 'services/company-registration',
  'service-bank-account.html': 'services/bank-account',
  'service-nominee-ubo.html': 'services/nominee-ubo',
  'service-shelf-company.html': 'services/shelf-company',
  'service-tax-residency.html': 'services/tax-residency',
  'service-annual-renewals.html': 'services/annual-renewals',
  'pricing-self-ubo.html': 'pricing/self-ubo',
  'pricing-nominee-ubo.html': 'pricing/nominee-ubo',
  'pricing-shelf-company.html': 'pricing/shelf-company',
  '0-tax-guide-cta.html': 'lp/tax-guide',
  '1-whatsapp-specialist-cta.html': 'lp/whatsapp-consultation',
  '2-meeting-booking-cta.html': 'lp/strategy-call',
  '3-promo-banner.html': 'lp/jurisdiction-comparison',
  '00-gccstartup-nl-hk-thank-you-page.html': 'thank-you',
  'philippines-partners.html': 'philippines-partners'
};

// WhatsApp chat bubble widget
let chatBubble = '';
const chatBubblePath = path.join(srcDir, '4-whatsapp-chat-bubble.html');
if (fs.existsSync(chatBubblePath)) {
  chatBubble = fs.readFileSync(chatBubblePath, 'utf8');
}

// Process files
const allFiles = fs.readdirSync(srcDir).filter(file => file.endsWith('.html'));
const sitemapUrls = [];

for (const file of allFiles) {
  // Try to find the route map, if not found use the file name as fallback (minus .html)
  // Or check if it's an embed
  let routePath = routes[file];
  
  if (routePath === undefined) {
    if (file === '4-whatsapp-chat-bubble.html' || file.startsWith('lp-')) {
      // Chat bubble is injected, lp-company-registration-hongkong.html has route lp/company-registration-hong-kong
      if (file === 'lp-company-registration-hongkong.html') {
         routePath = 'company-registration-hong-kong';
      } else {
         continue; // Skip
      }
    } else {
      routePath = file.replace('.html', '');
    }
  }

  let content = fs.readFileSync(path.join(srcDir, file), 'utf8');

  // Replacements
  content = content.replace(/const LEAD_ENDPOINT = '';/g, "const LEAD_ENDPOINT = '/api/lead';");
  content = content.replace(/var CMS='https:\/\/cms\.gccstartup\.com'/g, "var CMS=''");
  content = content.replace(/https:\/\/cms\.gccstartup\.com\/api\/lead/g, '/api/lead');
  content = content.replace(/wa\.me\/gccstartup/g, 'wa.me/447868762416');
  content = content.replace(/YOURWHATSAPPNUMBER/g, '447868762416');
  
  // Also fix internal links. Naive replacement:
  content = content.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    const targetFile = `${p1}.html`.split('/').pop();
    if (routes[targetFile] !== undefined) {
      return `href="/${routes[targetFile]}/"`;
    }
    return match;
  });

  // Inject canonical link if head exists
  const canonicalUrl = `https://gccstartup.com/${routePath}${routePath ? '/' : ''}`;
  if (content.includes('<head>')) {
    content = content.replace('<head>', `<head>\n  <link rel="canonical" href="${canonicalUrl}">`);
  }
  
  sitemapUrls.push(canonicalUrl);

  // Append WhatsApp widget if it's not a standalone widget (starts with 0-, 1-, 2-, 3-, 4-)
  if (!file.match(/^[0-4]-/)) {
    // If it has </body>, inject before it
    if (content.includes('</body>')) {
      content = content.replace('</body>', `\n${chatBubble}\n</body>`);
    } else {
      content += `\n${chatBubble}`;
    }
  }
  
  // Write out
  let outDir = path.join(destDir, routePath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(outDir, 'index.html'), content, 'utf8');
  console.log(`Built ${file} -> ${path.join(routePath, 'index.html')}`);
}

// Write Sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(destDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Built sitemap.xml');
