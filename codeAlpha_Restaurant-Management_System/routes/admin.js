const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const Reservation = require('../models/Reservation');

// GET: Admin Dashboard (View Reservations)
router.get('/', async (req, res) => {
    try {
        // Fetch reservations, sorting by the newest first
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.render('admin/dashboard', { title: 'Admin Dashboard', reservations });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET: Menu Manager
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find().sort({ category: 1 });
        res.render('admin/menu-manager', { title: 'Manage Menu', menuItems });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// POST: Add New Menu Item
router.post('/menu/add', async (req, res) => {
    try {
        const { name, category, price, description, imagePath, isVeg } = req.body;
        
        const newItem = new MenuItem({
            name,
            category,
            price: Number(price),
            description,
            imagePath,
            isVeg: isVeg === 'on' ? true : false,
            isAvailable: true
        });

        await newItem.save();
        res.redirect('/admin/menu');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding item');
    }
});

// POST: Delete Menu Item
router.post('/menu/delete/:id', async (req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.redirect('/admin/menu');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting item');
    }
});

// POST: Update Reservation Status
router.post('/reservations/update/:id', async (req, res) => {
    try {
        await Reservation.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating reservation');
    }
});

module.exports = router;