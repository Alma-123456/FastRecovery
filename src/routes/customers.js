const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// GET /api/v1/customers - Get all customers
router.get('/', customerController.getAllCustomers);

// GET /api/v1/customers/status/:status - Get customers by status
router.get('/status/:status', customerController.getCustomersByStatus);

// GET /api/v1/customers/:id - Get customer by ID
router.get('/:id', customerController.getCustomerById);

// POST /api/v1/customers - Create new customer
router.post('/', customerController.createCustomer);

// PUT /api/v1/customers/:id - Update customer
router.put('/:id', customerController.updateCustomer);

// PUT /api/v1/customers/:id/assign-driver - Assign driver to customer
router.put('/:id/assign-driver', customerController.assignDriver);

// DELETE /api/v1/customers/:id - Delete customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;