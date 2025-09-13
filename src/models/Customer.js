// In-memory data store for customers (in production, this would be a database)
let customers = [
  {
    id: 1,
    name: 'Mike Wilson',
    phone: '+1-555-0789',
    email: 'mike.wilson@example.com',
    address: '123 Main St, New York, NY 10001',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      color: 'Blue',
      licensePlate: 'ABC123'
    },
    assignedDriverId: 1,
    status: 'waiting_for_recovery',
    requestedAt: new Date('2024-01-15T10:30:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 2,
    name: 'Lisa Brown',
    phone: '+1-555-0321',
    email: 'lisa.brown@example.com',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    vehicleInfo: {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      color: 'Red',
      licensePlate: 'XYZ789'
    },
    assignedDriverId: 2,
    status: 'recovered',
    requestedAt: new Date('2024-01-14T14:20:00Z'),
    completedAt: new Date('2024-01-14T16:45:00Z'),
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-14T16:45:00Z')
  }
];

let nextId = 3;

class Customer {
  static getAll() {
    return customers;
  }

  static getById(id) {
    return customers.find(customer => customer.id === parseInt(id));
  }

  static create(customerData) {
    const newCustomer = {
      id: nextId++,
      ...customerData,
      status: customerData.status || 'waiting_for_recovery',
      requestedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    customers.push(newCustomer);
    return newCustomer;
  }

  static update(id, updateData) {
    const customerIndex = customers.findIndex(customer => customer.id === parseInt(id));
    if (customerIndex === -1) {
      return null;
    }
    
    customers[customerIndex] = {
      ...customers[customerIndex],
      ...updateData,
      id: parseInt(id),
      updatedAt: new Date()
    };
    
    return customers[customerIndex];
  }

  static delete(id) {
    const customerIndex = customers.findIndex(customer => customer.id === parseInt(id));
    if (customerIndex === -1) {
      return null;
    }
    
    const deletedCustomer = customers.splice(customerIndex, 1)[0];
    return deletedCustomer;
  }

  static getByStatus(status) {
    return customers.filter(customer => customer.status === status);
  }

  static getByDriverId(driverId) {
    return customers.filter(customer => customer.assignedDriverId === parseInt(driverId));
  }

  static assignDriver(customerId, driverId) {
    const customer = this.getById(customerId);
    if (!customer) {
      return null;
    }
    
    return this.update(customerId, { 
      assignedDriverId: parseInt(driverId),
      status: 'assigned_to_driver'
    });
  }
}

module.exports = Customer;