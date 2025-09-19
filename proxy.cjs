// proxy.cjs

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;


app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url param');

  try {
    const response = await fetch(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    let html = await response.text();

    // Supprime les CSP et X-Frame-Options dans le HTML (pour les balises meta)
    html = html.replace(/<meta[^>]+http-equiv=["']?(Content-Security-Policy|X-Frame-Options)[^>]*>/gi, '');

    // Supprime les headers côté serveur
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (err) {
    res.status(500).send('Erreur proxy: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
