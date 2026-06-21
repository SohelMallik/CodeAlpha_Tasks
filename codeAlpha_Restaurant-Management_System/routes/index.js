const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');
const Order = require('../models/Order'); // Required for the cart system

// 1. GET: Home Page
router.get('/', (req, res) => {
  res.render('home', { title: 'The Royals | Home' });
});

// 2. GET: Menu Page
router.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true }).sort({ category: 1 });
    
    // Group items by category for easier rendering in EJS
    const groupedMenu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    res.render('menu', { title: 'The Royals | Menu', groupedMenu });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 3. POST: Table Booking (THIS IS THE ROUTE THAT WAS MISSING)
router.post('/book', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    
    const newReservation = new Reservation({
      name, email, phone, date, time, guests, specialRequests
    });

    await newReservation.save();
    
    res.send(`
      <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h1 style="color: #16a34a;">Booking Request Sent!</h1>
        <p>Thank you, ${name}. We have received your request for a table for ${guests} on ${date} at ${time}.</p>
        <a href="/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px;">Return Home</a>
      </div>
    `);
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).send('Error processing your booking. Please try again later.');
  }
});

// 4. POST: Place a Food Order from the Cart
router.post('/order', async (req, res) => {
    try {
        const { customerName, tableNumber, specialInstructions, cartData } = req.body;
        
        // Parse the cart data sent from the frontend
        const items = JSON.parse(cartData);
        
        if (!items || items.length === 0) {
            return res.status(400).send('Cart is empty');
        }

        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const newOrder = new Order({
            customerName,
            tableNumber: tableNumber ? Number(tableNumber) : null,
            items: items.map(item => ({
                menuItem: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount,
            specialInstructions,
            status: 'Received'
        });

        await newOrder.save();
        
        res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: #16a34a;">Order Placed Successfully!</h1>
                <p>Thank you, ${customerName}. The kitchen has received your order.</p>
                <a href="/menu" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background: #dc2626; color: white; text-decoration: none; border-radius: 5px;">Back to Menu</a>
            </div>
        `);
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send('Error processing your order.');
    }
});

module.exports = router;