const express = require('express');
const router = express.Router();


const reviewController = require('../controllers/reviewController');


router.get('/', reviewController.getAllUsers);
router.get('/:id', reviewController.getUserById);
router.post('/', reviewController.createUser);
router.put('/:id', reviewController.updateUser);
router.delete('/:id', reviewController.deleteUser);


module.exports = router;