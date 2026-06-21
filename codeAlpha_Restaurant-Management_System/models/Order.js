const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  tableNumber: { type: Number }, // Optional: if they are dining in
  items: [{
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      name: String,
      quantity: { type: Number, required: true },
      price: Number
  }],
  totalAmount: { type: Number, required: true },
  specialInstructions: { type: String },
  status: {
      type: String,
      enum: ['Received', 'Preparing', 'Ready'],
      default: 'Received'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);