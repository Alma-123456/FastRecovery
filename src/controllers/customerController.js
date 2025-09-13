const Customer = require('../models/Customer');
const Driver = require('../models/Driver');

const customerController = {
  // Get all customers
  getAllCustomers: (req, res) => {
    try {
      const customers = Customer.getAll();
      res.json({
        success: true,
        data: customers,
        count: customers.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch customers',
        message: error.message
      });
    }
  },

  // Get customer by ID
  getCustomerById: (req, res) => {
    try {
      const { id } = req.params;
      const customer = Customer.getById(id);
      
      if (!customer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      res.json({
        success: true,
        data: customer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch customer',
        message: error.message
      });
    }
  },

  // Create new customer
  createCustomer: (req, res) => {
    try {
      const { name, phone, email, address, vehicleInfo } = req.body;

      // Basic validation
      if (!name || !phone || !address || !vehicleInfo) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
          required: ['name', 'phone', 'address', 'vehicleInfo']
        });
      }

      // Validate vehicle info
      if (!vehicleInfo.make || !vehicleInfo.model || !vehicleInfo.licensePlate) {
        return res.status(400).json({
          success: false,
          error: 'Missing required vehicle information',
          required: ['vehicleInfo.make', 'vehicleInfo.model', 'vehicleInfo.licensePlate']
        });
      }

      const newCustomer = Customer.create({
        name,
        phone,
        email,
        address,
        vehicleInfo
      });

      res.status(201).json({
        success: true,
        data: newCustomer,
        message: 'Customer created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create customer',
        message: error.message
      });
    }
  },

  // Update customer
  updateCustomer: (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedCustomer = Customer.update(id, updateData);
      
      if (!updatedCustomer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      res.json({
        success: true,
        data: updatedCustomer,
        message: 'Customer updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update customer',
        message: error.message
      });
    }
  },

  // Delete customer
  deleteCustomer: (req, res) => {
    try {
      const { id } = req.params;
      const deletedCustomer = Customer.delete(id);
      
      if (!deletedCustomer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      res.json({
        success: true,
        data: deletedCustomer,
        message: 'Customer deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete customer',
        message: error.message
      });
    }
  },

  // Get customers by status
  getCustomersByStatus: (req, res) => {
    try {
      const { status } = req.params;
      const customers = Customer.getByStatus(status);
      res.json({
        success: true,
        data: customers,
        count: customers.length,
        status: status
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch customers by status',
        message: error.message
      });
    }
  },

  // Assign driver to customer
  assignDriver: (req, res) => {
    try {
      const { id } = req.params;
      const { driverId } = req.body;

      if (!driverId) {
        return res.status(400).json({
          success: false,
          error: 'Driver ID is required'
        });
      }

      // Check if driver exists
      const driver = Driver.getById(driverId);
      if (!driver) {
        return res.status(404).json({
          success: false,
          error: 'Driver not found'
        });
      }

      const updatedCustomer = Customer.assignDriver(id, driverId);
      
      if (!updatedCustomer) {
        return res.status(404).json({
          success: false,
          error: 'Customer not found'
        });
      }

      res.json({
        success: true,
        data: updatedCustomer,
        message: `Driver ${driver.name} assigned to customer successfully`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to assign driver',
        message: error.message
      });
    }
  }
};

module.exports = customerController;