const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contactsController');

router.get('/', contactsController.getAllContact);
router.get('/:id', contactsController.getSingleContact);

router.post('/', contactsController.createContact);
router.put('/:id',contactsController.updateContact);
router.delete('/:id',contactsController.deleteContact);

module.exports = router;