const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken'); // Correct path

const subscriptionController = require('../controllers/subscriptionController');

router.get('/user/:id', subscriptionController.getSubscriptionByUserId);


router.get('/', subscriptionController.getAllSubscription, authenticateToken);
router.get('/:id', subscriptionController.getSubscriptionById, authenticateToken);
router.post('/', subscriptionController.createSubscription, authenticateToken);
router.put('/:id', subscriptionController.updateSubscription, authenticateToken);
router.delete('/:id', subscriptionController.deleteSubscription, authenticateToken);

// router.get('/available', motorcycleController.displayMotorcycle);

module.exports = router;