const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// GET /api/v1/drivers - Get all drivers
router.get('/', driverController.getAllDrivers);

// GET /api/v1/drivers/active - Get active drivers
router.get('/active', driverController.getActiveDrivers);

// GET /api/v1/drivers/:id - Get driver by ID
router.get('/:id', driverController.getDriverById);

// GET /api/v1/drivers/:id/customers - Get driver's customers
router.get('/:id/customers', driverController.getDriverCustomers);

// POST /api/v1/drivers - Create new driver
router.post('/', driverController.createDriver);

// PUT /api/v1/drivers/:id - Update driver
router.put('/:id', driverController.updateDriver);

// DELETE /api/v1/drivers/:id - Delete driver
router.delete('/:id', driverController.deleteDriver);

module.exports = router;