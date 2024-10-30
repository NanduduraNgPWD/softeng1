const express = require('express');
const router = express.Router();


const registrationController = require('../controllers/registrationController');


router.get('/', registrationController.getAllRegistration);
router.get('/:id', registrationController.getRegistrationById);
router.post('/', registrationController.createRegistration);



module.exports = router;