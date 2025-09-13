// In-memory data store for drivers (in production, this would be a database)
let drivers = [
  {
    id: 1,
    name: 'John Smith',
    phone: '+1-555-0123',
    email: 'john.smith@example.com',
    licenseNumber: 'DL123456789',
    vehicleType: 'Tow Truck',
    status: 'active',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, NY'
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+1-555-0456',
    email: 'sarah.johnson@example.com',
    licenseNumber: 'DL987654321',
    vehicleType: 'Recovery Truck',
    status: 'active',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: 'Los Angeles, CA'
    },
    createdAt: new Date('2024-01-02T00:00:00Z'),
    updatedAt: new Date('2024-01-02T00:00:00Z')
  }
];

let nextId = 3;

class Driver {
  static getAll() {
    return drivers;
  }

  static getById(id) {
    return drivers.find(driver => driver.id === parseInt(id));
  }

  static create(driverData) {
    const newDriver = {
      id: nextId++,
      ...driverData,
      status: driverData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    drivers.push(newDriver);
    return newDriver;
  }

  static update(id, updateData) {
    const driverIndex = drivers.findIndex(driver => driver.id === parseInt(id));
    if (driverIndex === -1) {
      return null;
    }
    
    drivers[driverIndex] = {
      ...drivers[driverIndex],
      ...updateData,
      id: parseInt(id),
      updatedAt: new Date()
    };
    
    return drivers[driverIndex];
  }

  static delete(id) {
    const driverIndex = drivers.findIndex(driver => driver.id === parseInt(id));
    if (driverIndex === -1) {
      return null;
    }
    
    const deletedDriver = drivers.splice(driverIndex, 1)[0];
    return deletedDriver;
  }

  static getByStatus(status) {
    return drivers.filter(driver => driver.status === status);
  }

  static getActiveDrivers() {
    return this.getByStatus('active');
  }
}

module.exports = Driver;