// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   buyer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   product: {
//     id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
   
//     image: {
//       type: String,
//     },
//     selectedColor: {
//       type: String,
//     },
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   shippingAddress: {
//     fullName: {
//       type: String,
//       required: true,
//     },
//     addressLine1: {
//       type: String,
//       required: true,
//     },
//     addressLine2: {
//       type: String,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     state: {
//       type: String,
//       required: true,
//     },
//     zipCode: {
//       type: String,
//       required: true,
//     },
//     country: {
//       type: String,
//       required: true,
//     },
//   },
//   paymentMethod: {
//     type: String,
//     required: true,
//   },
//   orderStatus: {
//     type: String,
//     enum: ['pending', 'accepted', 'delivered', 'cancelled'],
//     default: 'pending',
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Order', orderSchema);








//new one

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    selectedColor: {
      type: String,
    },
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  shippingAddress: {
    fullName: {
      type: String,
      required: true,
    },
    phone: {               // ✅ Added phone
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'accepted', 'delivered', 'cancelled'],
    default: 'pending',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);
