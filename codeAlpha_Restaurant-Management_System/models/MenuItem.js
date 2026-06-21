const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Fast Food & Snacks', 'Indian Thali', 'Beverages', 'Desserts', 'Ice Creams']
  },
  price: { type: Number, required: true },
  description: { type: String },
  imagePath: { type: String, required: true },
  isVeg: { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);