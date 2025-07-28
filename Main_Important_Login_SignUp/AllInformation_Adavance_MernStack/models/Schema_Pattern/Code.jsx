
🛍️ Scenario: E-commerce Platform
We’ll implement a MERN stack project with:

Users

Products

Orders

Reviews

Admin Panel

Logs


🔹 /models/Log.js – Bucket Pattern (Time-Series)

const mongoose = require('mongoose');

const LogBucketSchema = new mongoose.Schema({
  service: String,
  date: Date, // e.g., 2025-07-27
  logs: [
    {
      timestamp: Date,
      level: { type: String, enum: ['info', 'warn', 'error'] },
      message: String
    }
  ]
});

module.exports = mongoose.model('LogBucket', LogBucketSchema);




🔹 /models/Order.js – Referenced Pattern
js
Copy
Edit
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);




🔹 /models/Review.js – Polymorphic Pattern



const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewableId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'reviewableType'
  },
  reviewableType: {
    type: String,
    required: true,
    enum: ['Product', 'Order']
  }
});

module.exports = mongoose.model('Review', ReviewSchema);




🔹 /models/Product.js – Embedded Pattern

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  specs: {
    weight: Number,
    color: String,
    dimensions: String
  },
  tags: [String],
  images: [String]
});

module.exports = mongoose.model('Product', ProductSchema);




🔹 /models/User.js – Discriminator + Outlier Pattern


const mongoose = require('mongoose');

const BaseUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['Customer', 'Admin'] },
}, { discriminatorKey: 'role', timestamps: true });

const User = mongoose.model('User', BaseUserSchema);

// Outlier pattern — move profile to another collection
const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  address: String,
  phone: String,
  avatar: String
});
const Profile = mongoose.model('Profile', ProfileSchema);

// Discriminator example: Admin has extra fields
const Admin = User.discriminator('Admin', new mongoose.Schema({
  accessLevel: Number
}));

module.exports = { User, Profile, Admin };




6. Schema Inheritance (Discriminators)
Used when multiple models share common fields but have their own custom fields.

js
Copy
Edit
const BaseUserSchema = new mongoose.Schema({ name: String }, { discriminatorKey: 'kind' });

const User = mongoose.model('User', BaseUserSchema);
const Admin = User.discriminator('Admin', new mongoose.Schema({ adminLevel: Number }));
✅ Best For:

Roles or types with shared fields

Cleaner inheritance structure




5. Polymorphic Schema Pattern
Allows one schema to refer to multiple different schemas using a refPath.

js
Copy
Edit
const CommentSchema = new mongoose.Schema({
  content: String,
  commentableId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'commentableModel'
  },
  commentableModel: {
    type: String,
    required: true,
    enum: ['Post', 'Photo']
  }
});
✅ Best For:

Reusable comments/likes system across multiple models





1. Embedded Documents Pattern (Denormalization)
Store related data inside a single document.

js
Copy
Edit
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [
    {
      user: String,
      message: String,
      timestamp: Date
    }
  ]
});
✅ Best For:

Fast reads

Nested data

Data that doesn’t grow infinitely

❌ Not Good If:

Embedded array grows large

You need frequent updates to nested elements

2. Referenced Documents Pattern (Normalization)
Store relations using ObjectIds and populate when needed.

js
Copy
Edit
const UserSchema = new mongoose.Schema({ name: String });

const PostSchema = new mongoose.Schema({
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
✅ Best For:

Reusability

Relationships across documents

Avoiding huge document size

❌ Slower reads (requires .populate())

3. Bucket Pattern (Time-Series / Logs)
Group documents into "buckets" for better query performance on time-based data.

js
Copy
Edit
const LogBucketSchema = new mongoose.Schema({
  date: Date,
  logs: [
    {
      timestamp: Date,
      level: String,
      message: String
    }
  ]
});
✅ Best For:

Time-series data (logs, metrics)

Reduces document count

4. Outlier Pattern
Move unusually large or frequently updated subdocuments to their own collection.


// Main user schema
const UserSchema = new mongoose.Schema({
  name: String,
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

// Separated schema
const ProfileSchema = new mongoose.Schema({
  bio: String,
  avatarUrl: String
});
✅ Best For:

Avoiding bloated documents

Separating volatile data