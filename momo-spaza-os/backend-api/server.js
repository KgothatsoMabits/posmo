require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const momoRoutes = require('./src/routes/momoRoutes');
app.use('/api/momo', momoRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'MoMo Spaza OS Backend is running sexxxyyy.',
        timestamp: new Date().toISOString()
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server initialized on port ${PORT}`);
});