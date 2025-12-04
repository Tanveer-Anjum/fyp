import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js'; // Assuming Product model exists

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private (requires authentication)
router.post('/', auth, async (req, res) => {
  const {
    product,
    quantity,
    shippingAddress,
    paymentMethod,
    notes,
  } = req.body;

  try {
    // Ensure product exists and get seller ID
    const productDetails = await Product.findById(product.id);
    if (!productDetails) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newOrder = new Order({
      buyer: req.user.id, // User ID from auth middleware
      product: {
        id: product.id,
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.imageUrl || '/uploads/default-product.jpg',
        selectedColor: product.selectedColor,
      },
      quantity,
      shippingAddress,
      paymentMethod,
      notes,
      seller: productDetails.owner, // Assuming productDetails has an owner field for the seller
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/orders
// @desc    Get all orders for the authenticated buyer
// @access  Private (requires authentication)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).sort({ orderDate: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; // Changed to ES module default export
