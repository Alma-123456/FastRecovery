const Driver = require('../models/Driver');
const Customer = require('../models/Customer');

const driverController = {
  // Get all drivers
  getAllDrivers: (req, res) => {
    try {
      const drivers = Driver.getAll();
      res.json({
        success: true,
        data: drivers,
        count: drivers.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch drivers',
        message: error.message
      });
    }
  },

  // Get driver by ID
  getDriverById: (req, res) => {
    try {
      const { id } = req.params;
      const driver = Driver.getById(id);
      
      if (!driver) {
        return res.status(404).json({
          success: false,
          error: 'Driver not found'
        });
      }

      res.json({
        success: true,
        data: driver
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch driver',
        message: error.message
      });
    }
  },

  // Create new driver
  createDriver: (req, res) => {
    try {
      const { name, phone, email, licenseNumber, vehicleType, location } = req.body;

      // Basic validation
      if (!name || !phone || !email || !licenseNumber || !vehicleType) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          required: ['name', 'phone', 'email', 'licenseNumber', 'vehicleType']
        });
      }

      const newDriver = Driver.create({
        name,
        phone,
        email,
        licenseNumber,
        vehicleType,
        location
      });

      res.status(201).json({
        success: true,
        data: newDriver,
        message: 'Driver created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create driver',
        message: error.message
      });
    }
  },

  // Update driver
  updateDriver: (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedDriver = Driver.update(id, updateData);
      
      if (!updatedDriver) {
        return res.status(404).json({
          success: false,
          error: 'Driver not found'
        });
      }

      res.json({
        success: true,
        data: updatedDriver,
        message: 'Driver updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update driver',
        message: error.message
      });
    }
  },

  // Delete driver
  deleteDriver: (req, res) => {
    try {
      const { id } = req.params;
      const deletedDriver = Driver.delete(id);
      
      if (!deletedDriver) {
        return res.status(404).json({
          success: false,
          error: 'Driver not found'
        });
      }

      res.json({
        success: true,
        data: deletedDriver,
        message: 'Driver deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete driver',
        message: error.message
      });
    }
  },

  // Get active drivers
  getActiveDrivers: (req, res) => {
    try {
      const activeDrivers = Driver.getActiveDrivers();
      res.json({
        success: true,
        data: activeDrivers,
        count: activeDrivers.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch active drivers',
        message: error.message
      });
    }
  },

  // Get driver's customers
  getDriverCustomers: (req, res) => {
    try {
      const { id } = req.params;
      const driver = Driver.getById(id);
      
      if (!driver) {
        return res.status(404).json({
          success: false,
          error: 'Driver not found'
        });
      }

      const customers = Customer.getByDriverId(id);
      res.json({
        success: true,
        data: {
          driver: driver,
          customers: customers,
          customerCount: customers.length
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch driver customers',
        message: error.message
      });
    }
  }
};

module.exports = driverController;