const express = require('express');
const router = express.Router();


const motorcycleController = require('../controllers/motorcycleController');


router.get('/', motorcycleController.getAllMotorcycle);
router.get('/:id', motorcycleController.getMotorcycleById);
router.post('/', motorcycleController.createMotorcycle);
router.put('/:id', motorcycleController.updateMotorcycle);
router.delete('/:id', motorcycleController.deleteMotorcycle);

// router.get('/available', motorcycleController.displayMotorcycle);

module.exports = router;