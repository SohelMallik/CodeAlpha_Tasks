require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/theroyals';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Basic Authentication Middleware
const requireAuth = (role) => {
    return (req, res, next) => {
        // Parse the standard Authorization header
        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
        const decodedStr = Buffer.from(b64auth, 'base64').toString();
        
        // FIX 1: Safely split only on the first colon
        const colonIndex = decodedStr.indexOf(':');
        const user = decodedStr.substring(0, colonIndex);
        const password = decodedStr.substring(colonIndex + 1);

        // Check credentials based on the requested role
        let expectedUser, expectedPass;
        if (role === 'admin') {
            expectedUser = process.env.ADMIN_USER;
            expectedPass = process.env.ADMIN_PASS;
        } else if (role === 'chef') {
            expectedUser = process.env.CHEF_USER;
            expectedPass = process.env.CHEF_PASS;
        }

        // FIX 2: Safety check to ensure .env variables are actually loaded
        if (!expectedUser || !expectedPass) {
            console.error(`🚨 SECURITY WARNING: Missing .env credentials for role: ${role}`);
            return res.status(500).send('Server configuration error.');
        }

        // Validate
        if (user === expectedUser && password === expectedPass) {
            return next(); // Access granted
        }

        // Access denied - trigger native browser login prompt
        res.set('WWW-Authenticate', 'Basic realm="401"');
        res.status(401).send('Authentication required.');
    };
};

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRoutes);
app.use('/admin', requireAuth('admin'), require('./routes/admin')); // Protected Admin Route
app.use('/chef', requireAuth('chef'), require('./routes/chef'));    // Protected Chef Route

// Database Connection & Server Start
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
    });