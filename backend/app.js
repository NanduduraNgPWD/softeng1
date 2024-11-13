const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const userRoutes = require('./routes/userRoutes');
const motorcycleRoutes = require('./routes/motorcycleRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const things = require('./things');

// Use express.json() to parse JSON payloads
app.use(express.json());

// Set up CORS
app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Route definitions
app.use('/things', things);
app.use('/users', userRoutes);
app.use('/motorcycles', motorcycleRoutes);
app.use('/payments', paymentRoutes);
app.use('/bookings', bookingRoutes);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
