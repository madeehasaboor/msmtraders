const express = require('express');
const cors = require('cors');
const compression = require('compression');
const app = express();
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());

// Routes

const path = require('path');
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    const oneYear = 31536000;
    if (/\.(?:js|css|png|jpg|jpeg|webp|avif|gif|svg|woff2?)$/i.test(filePath)) {
      res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
    } else if (/\.(?:html)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api/products', productRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3001');
});
