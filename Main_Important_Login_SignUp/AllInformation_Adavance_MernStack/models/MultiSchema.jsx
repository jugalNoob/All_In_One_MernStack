📁 Project Structure
pgsql
Copy
Edit
multipleschemas/
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── index.js
🧠 Mongoose Schemas
models/User.js
js
Copy
Edit
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
});

module.exports = mongoose.model('User', UserSchema);
models/Product.js
js
Copy
Edit
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
});

module.exports = mongoose.model('Product', ProductSchema);
models/Order.js
js
Copy
Edit
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  products: [String],
  totalAmount: Number,
  status: String
});

module.exports = mongoose.model('Order', OrderSchema);
🚀 Main Server (index.js)
js
Copy
Edit
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/multipleschemas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 🔁 Dynamic create route
app.post('/create', async (req, res) => {
  const { type, data } = req.body;

  try {
    let result;

    switch (type) {
      case 'user':
        result = await User.create(data);
        break;
      case 'product':
        result = await Product.create(data);
        break;
      case 'order':
        result = await Order.create(data);
        break;
      default:
        return res.status(400).json({ error: 'Invalid type provided.' });
    }

    res.status(201).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
