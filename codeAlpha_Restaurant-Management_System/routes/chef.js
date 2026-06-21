const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET: Chef's Kitchen Display System
router.get('/', async (req, res) => {
    try {
        // Fetch only active orders (Received or Preparing), oldest first (FIFO)
        const activeOrders = await Order.find({ status: { $ne: 'Ready' } })
                                        .sort({ createdAt: 1 });
        
        res.render('chef/dashboard', { title: 'Kitchen Display System', activeOrders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// POST: Update Order Status (Chef clicking "Preparing" or "Ready")
router.post('/update-status/:id', async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.redirect('/chef');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating order');
    }
});

module.exports = router;