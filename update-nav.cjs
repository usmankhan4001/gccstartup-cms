const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'Pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Navbar Link
  if (content.includes('<a href="#resources">Free Guides</a>') && !content.includes('philippines-partners.html">Partner Program</a>')) {
    content = content.replace(
      '<a href="#resources">Free Guides</a>',
      '<a href="#resources">Free Guides</a>\n        <a href="philippines-partners.html">Partner Program</a>'
    );
  }

  // 2. Drawer Link
  if (content.includes('<div class="drawer-link"><a href="#resources" onclick="closeNav()">Free Guides</a></div>') && !content.includes('philippines-partners.html" onclick="closeNav()">Partner Program</a>')) {
    content = content.replace(
      '<div class="drawer-link"><a href="#resources" onclick="closeNav()">Free Guides</a></div>',
      '<div class="drawer-link"><a href="#resources" onclick="closeNav()">Free Guides</a></div>\n      <div class="drawer-link"><a href="philippines-partners.html" onclick="closeNav()">Partner Program</a></div>'
    );
  }

  // 3. Footer Link (under Pricing)
  if (content.includes('<li><a href="pricing-shelf-company.html">Shelf Company</a></li>\n        </ul>') && !content.includes('Partner Program</a></li>')) {
    content = content.replace(
      '<li><a href="pricing-shelf-company.html">Shelf Company</a></li>\n        </ul>',
      '<li><a href="pricing-shelf-company.html">Shelf Company</a></li>\n        </ul>\n        <h5 style="margin-top:22px">Company</h5>\n        <ul class="footer-links">\n          <li><a href="philippines-partners.html">Partner Program</a></li>\n        </ul>'
    );
  }
  
  // also handle Windows CRLF if they differ
  if (content.includes('<li><a href="pricing-shelf-company.html">Shelf Company</a></li>\r\n        </ul>') && !content.includes('Partner Program</a></li>')) {
    content = content.replace(
      '<li><a href="pricing-shelf-company.html">Shelf Company</a></li>\r\n        </ul>',
      '<li><a href="pricing-shelf-company.html">Shelf Company</a></li>\r\n        </ul>\r\n        <h5 style="margin-top:22px">Company</h5>\r\n        <ul class="footer-links">\r\n          <li><a href="philippines-partners.html">Partner Program</a></li>\r\n        </ul>'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Navbar and Footer updated successfully!');
