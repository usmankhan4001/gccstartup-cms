const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static site
app.use(express.static(path.join(__dirname, 'site')));

// Mount the serverless API (adapted for Express)
app.post('/api/lead', async (req, res) => {
  try {
    // Dynamic import the handler since it's ES module style or we can just require it if it's CJS.
    // Wait, api/lead.js uses export default. We should write it such that Node.js can use it, or just copy the logic here.
    // Actually, since api/lead.js uses `export default async function handler(req)`, it's designed for Edge/Vercel.
    // Let's implement a simple proxy to it, or just redefine the route here if it's easier, or we can use the Next.js approach.
    // But since Vercel handles it natively, for Dokploy let's just make it a Next.js style or standard Express.
    // Let's import api/lead.js. Since it's ES Module, we can use dynamic import.
    const leadApi = await import('./api/lead.js');
    
    // We need to convert Express req to Web Request for the Edge handler
    const url = new URL(req.url, `http://${req.headers.host}`);
    const webReq = new Request(url.href, {
      method: req.method,
      headers: req.headers,
      body: JSON.stringify(req.body)
    });
    
    const webRes = await leadApi.default(webReq);
    const text = await webRes.text();
    
    res.status(webRes.status).send(text);
  } catch (error) {
    console.error('Error in /api/lead:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'site', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
