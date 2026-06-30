const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'Pages', 'index.html'), 'utf8');
const partnerHtml = fs.readFileSync(path.join(__dirname, 'Pages', 'philippines-partners.html'), 'utf8');

// The partnerHtml is already just <main>...</main> and some extra stuff maybe, let's extract it
const mainRegex = /<main[^>]*>[\s\S]*<\/main>/i;
const partnerMainMatch = partnerHtml.match(mainRegex);

if (!partnerMainMatch) {
  console.error("Could not find <main> in philippines-partners.html");
  process.exit(1);
}
const newMainContent = partnerMainMatch[0];

// In index.html, replace its <main>...</main> with newMainContent
const updatedHtml = indexHtml.replace(mainRegex, newMainContent);

// Also replace the title
const finalHtml = updatedHtml.replace(
  /<title>.*?<\/title>/i, 
  '<title>Philippines Partner Program - GCC Startup</title>'
).replace(
  /<meta name="description" content=".*?">/i,
  '<meta name="description" content="Become a verified partner in the Philippines and earn commissions assisting entrepreneurs.">'
);

fs.writeFileSync(path.join(__dirname, 'Pages', 'philippines-partners.html'), finalHtml);
console.log("Successfully rebuilt Pages/philippines-partners.html with the site theme!");
