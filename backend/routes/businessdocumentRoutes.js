const express = require('express');
const router = express.Router();


const documentController = require('../controllers/businessdocumentController');

router.get('/business/:id', documentController.getDocumentByBusinessId);
router.put('/business/:id', documentController.updateBusinessDocument);

router.get('/', documentController.getAllBusinessDocument);
router.get('/:id', documentController.getBusinessDocumentById);
router.post('/business/:id', documentController.createBusinessDocument);

router.delete('/:id', documentController.deleteDocument);
// router.get('/available', motorcycleController.displayMotorcycle);

module.exports = router;