import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ElectroHub Backend API is running', timestamp: new Date() });
});

// Products REST API
app.get('/api/products', (req, res) => {
  res.json({ success: true, message: 'Fetched electronic products catalog' });
});

app.post('/api/products', (req, res) => {
  const { name, price, stock, brand, category } = req.body;
  if (!name || !price || stock === undefined) {
    return res.status(400).json({ success: false, message: 'Name, price, and stock are required.' });
  }
  res.status(201).json({ success: true, message: 'Product created successfully' });
});

// Orders REST API
app.post('/api/orders', (req, res) => {
  const { items, recipientName, shippingAddress, total } = req.body;
  if (!items || items.length === 0 || !recipientName || !shippingAddress) {
    return res.status(400).json({ success: false, message: 'Invalid order parameters' });
  }
  res.status(201).json({
    success: true,
    orderNumber: `EH-${Date.now()}`,
    message: 'Order created successfully',
  });
});

// Vouchers Validation API
app.post('/api/vouchers/apply', (req, res) => {
  const { code, subtotal } = req.body;
  if (code === 'ELECTRO100') {
    return res.json({
      success: true,
      discount: 100000,
      code: 'ELECTRO100',
      message: 'Voucher applied successfully!',
    });
  }
  return res.status(404).json({ success: false, message: 'Invalid or expired voucher code' });
});

app.listen(PORT, () => {
  console.log(`⚡ ElectroHub API Server running on port ${PORT}`);
});
