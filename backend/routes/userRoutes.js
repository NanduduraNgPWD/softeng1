const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); // Import authenticateToken middleware
const authorizeRole = require('../middleware/authorizeRole'); // Import authorizeRole middleware

const userController = require('../controllers/userController');

// User CRUD Operations
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Business routes
router.get('/business/dashboard', authenticateToken, authorizeRole(['Business']), (req, res) => {
    res.json({ message: 'Welcome to the Business Dashboard!' });
});

// Customer routes
router.get('/customer/dashboard', authenticateToken, authorizeRole(['Customer']), (req, res) => {
    res.json({ message: 'Welcome to the Customer Dashboard!' });
});

// // Authentication Routes (if needed)
// router.post('/login', userController.loginUser); // Placeholder for login route

module.exports = router;
