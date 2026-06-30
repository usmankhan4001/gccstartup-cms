const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Pages');
const destDir = path.join(__dirname, 'site');
const transDir = path.join(__dirname, 'translations');

// Ensure site directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Load languages
let languages = [];
let translations = {};
if (fs.existsSync(path.join(transDir, 'index.json'))) {
  languages = JSON.parse(fs.readFileSync(path.join(transDir, 'index.json'), 'utf8')).languages;
  for (const lang of languages) {
    if (fs.existsSync(path.join(transDir, `${lang.code}.json`))) {
      translations[lang.code] = JSON.parse(fs.readFileSync(path.join(transDir, `${lang.code}.json`), 'utf8'));
    }
  }
}

// Flatten a JSON object to key-value pairs of strings
function flattenObj(obj, prefix = '', res = {}) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObj(obj[key], prefix + key + '.', res);
    } else if (typeof obj[key] === 'string') {
      res[prefix + key] = obj[key];
    }
  }
  return res;
}

const enDict = translations['en'] ? flattenObj(translations['en']) : {};
const langDicts = {};
for (const langCode in translations) {
  if (langCode !== 'en') {
    langDicts[langCode] = flattenObj(translations[langCode]);
  }
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

function generatePage(file, langCode = 'en') {
  let routePath = routes[file];
  
  if (routePath === undefined) {
    if (file === '4-whatsapp-chat-bubble.html' || file.startsWith('lp-')) {
      if (file === 'lp-company-registration-hongkong.html') {
         routePath = 'company-registration-hong-kong';
      } else {
         return; // Skip
      }
    } else {
      routePath = file.replace('.html', '');
    }
  }

  // Prepend lang code for non-english
  let outRoutePath = routePath;
  if (langCode !== 'en') {
    outRoutePath = routePath ? `${langCode}/${routePath}` : langCode;
  }

  let content = fs.readFileSync(path.join(srcDir, file), 'utf8');

  // Basic API replacements
  content = content.replace(/const LEAD_ENDPOINT = '';/g, "const LEAD_ENDPOINT = '/api/lead';");
  content = content.replace(/var CMS='https:\/\/cms\.gccstartup\.com'/g, "var CMS=''");
  content = content.replace(/https:\/\/cms\.gccstartup\.com\/api\/lead/g, '/api/lead');
  content = content.replace(/wa\.me\/gccstartup/g, 'wa.me/447868762416');
  content = content.replace(/YOURWHATSAPPNUMBER/g, '447868762416');
  
  // Link replacements (make them relative to the root language if needed)
  content = content.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    const targetFile = `${p1}.html`.split('/').pop();
    if (routes[targetFile] !== undefined) {
      let linkedRoute = routes[targetFile];
      if (langCode !== 'en') {
        return `href="/${langCode}/${linkedRoute}${linkedRoute ? '/' : ''}"`;
      }
      return `href="/${linkedRoute}${linkedRoute ? '/' : ''}"`;
    }
    return match;
  });

  // Apply translations for non-en languages
  if (langCode !== 'en' && langDicts[langCode]) {
    const targetDict = langDicts[langCode];
    // Very basic search and replace of exact English strings
    // We sort by length descending so we don't accidentally replace partial matches
    const keys = Object.keys(enDict).sort((a, b) => enDict[b].length - enDict[a].length);
    for (const key of keys) {
      const enStr = enDict[key];
      const targetStr = targetDict[key];
      if (enStr && targetStr && enStr.length > 4) {
        // Simple global replacement (escaped for regex)
        const escapedEnStr = enStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        content = content.replace(new RegExp(escapedEnStr, 'g'), targetStr);
      }
    }
    // Update html lang attribute
    content = content.replace(/<html[^>]*>/, (match) => {
      if (match.includes('lang=')) {
        return match.replace(/lang="[^"]+"/, `lang="${langCode}"`);
      }
      return match.replace('<html', `<html lang="${langCode}"`);
    });
  }

  // Inject canonical link
  const canonicalUrl = `https://gccstartup.com/${outRoutePath}${outRoutePath ? '/' : ''}`;
  if (content.includes('<head>')) {
    content = content.replace('<head>', `<head>\n  <link rel="canonical" href="${canonicalUrl}">`);
  }

  if (!file.match(/^[0-4]-/)) {
    if (content.includes('</body>')) {
      content = content.replace('</body>', `\n${chatBubble}\n</body>`);
    } else {
      content += `\n${chatBubble}`;
    }
  }

  const outDir = path.join(destDir, outRoutePath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(path.join(outDir, 'index.html'), content);
  console.log(`Built [${langCode}] ${file} -> ${outRoutePath}/index.html`);
}

for (const lang of languages) {
  for (const file of allFiles) {
    generatePage(file, lang.code);
  }
}
