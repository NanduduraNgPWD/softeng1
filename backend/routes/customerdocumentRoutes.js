const express = require('express');
const router = express.Router();


const documentController = require('../controllers/customerdocumentController');

router.get('/user/:id', documentController.getDocumentByCustomerId);

router.get('/', documentController.getAllCustomerDocument);
router.put('/user/:id', documentController.updateCustomerDocument);
router.get('/:id', documentController.getCustomerDocumentById);
router.post('/:id', documentController.createCustomerDocument);


// router.get('/available', motorcycleController.displayMotorcycle);

module.exports = router;