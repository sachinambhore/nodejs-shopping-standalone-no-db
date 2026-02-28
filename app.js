
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// In-memory products
let products = [
  { id: 1, title: "Laptop", price: 1200 },
  { id: 2, title: "Phone", price: 800 }
];

app.get('/', (req, res) => {
  res.render('shop', { products: products });
});

app.get('/admin', (req, res) => {
  res.render('admin', { products: products });
});

app.post('/add-product', (req, res) => {
  const { title, price } = req.body;
  products.push({
    id: products.length + 1,
    title,
    price: parseFloat(price)
  });
  res.redirect('/admin');
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
