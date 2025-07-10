const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Crave Tea Backend is running!');
});


app.get('/api/menu', async (req, res) => {
  const [items] = await db.query('SELECT * FROM items');
  res.json(items);
});

app.get('/api/item/:id', async (req, res) => {
  const [[item]] = await db.query('SELECT * FROM items WHERE id=?', [req.params.id]);
  res.json(item);
});

app.post('/api/order', async (req, res) => {
  const { name, phone, items, total } = req.body;
  await db.query('INSERT INTO orders (name, phone, items, total) VALUES (?, ?, ?, ?)', [name, phone, JSON.stringify(items), total]);
  res.json({ success: true });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));


app.get('/api/orders', async (req, res) => {
  const [orders] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
  res.json(orders);
});

