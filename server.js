import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Import the default export from the lead API
import leadApiHandler from './api/lead.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static site
app.use(express.static(path.join(__dirname, 'site')));

// Mount the serverless API (adapted for Express)
app.post('/api/lead', async (req, res) => {
  try {
    // We need to convert Express req to Web Request for the Edge handler
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // Construct headers object properly for the Web Request
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      headers.set(key, value);
    }
    
    const webReq = new Request(url.href, {
      method: req.method,
      headers: headers,
      body: JSON.stringify(req.body)
    });
    
    const webRes = await leadApiHandler(webReq);
    const text = await webRes.text();
    
    res.status(webRes.status).send(text);
  } catch (error) {
    console.error('Error in /api/lead:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get(/^.*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'site', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
