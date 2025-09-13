# FastRecovery Backend

Node.js backend for FastRecovery app - A comprehensive system for managing recovery drivers and their customers.

## Overview

FastRecovery Backend is a RESTful API service designed to manage recovery drivers and their customers. The system allows for efficient tracking and management of vehicle recovery operations, including driver assignments, customer requests, and service coordination.

## Features

- **Driver Management**: CRUD operations for recovery drivers
- **Customer Management**: CRUD operations for customers needing recovery services  
- **Driver-Customer Relationships**: Assign drivers to customers and track their assignments
- **Status Tracking**: Monitor the status of both drivers and recovery requests
- **RESTful API**: Clean, consistent API endpoints following REST principles
- **Error Handling**: Comprehensive error handling and validation
- **Testing**: Full test suite with Jest and Supertest

## Tech Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Jest**: Testing framework
- **Supertest**: HTTP assertion library for testing
- **Morgan**: HTTP request logger
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd FastRecovery-backend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration values

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

#### Running Tests
```bash
npm test
```

#### Running Tests in Watch Mode
```bash
npm run test:watch
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Health Check
- **GET** `/health` - Check server health status

#### Root
- **GET** `/` - Get API information and available endpoints

### Drivers API

#### Get All Drivers
- **GET** `/api/v1/drivers`
- Returns: List of all drivers

#### Get Active Drivers
- **GET** `/api/v1/drivers/active`
- Returns: List of active drivers only

#### Get Driver by ID
- **GET** `/api/v1/drivers/:id`
- Returns: Single driver details

#### Get Driver's Customers
- **GET** `/api/v1/drivers/:id/customers`
- Returns: Driver details with assigned customers

#### Create New Driver
- **POST** `/api/v1/drivers`
- Body:
```json
{
  "name": "John Doe",
  "phone": "+1-555-0123",
  "email": "john.doe@example.com",
  "licenseNumber": "DL123456789",
  "vehicleType": "Tow Truck",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "New York, NY"
  }
}
```

#### Update Driver
- **PUT** `/api/v1/drivers/:id`
- Body: Partial driver object with fields to update

#### Delete Driver
- **DELETE** `/api/v1/drivers/:id`
- Returns: Deleted driver details

### Customers API

#### Get All Customers
- **GET** `/api/v1/customers`
- Returns: List of all customers

#### Get Customer by ID
- **GET** `/api/v1/customers/:id`
- Returns: Single customer details

#### Get Customers by Status
- **GET** `/api/v1/customers/status/:status`
- Returns: List of customers with specified status
- Status options: `waiting_for_recovery`, `assigned_to_driver`, `recovered`

#### Create New Customer
- **POST** `/api/v1/customers`
- Body:
```json
{
  "name": "Jane Smith",
  "phone": "+1-555-0456",
  "email": "jane.smith@example.com",
  "address": "123 Main St, New York, NY 10001",
  "vehicleInfo": {
    "make": "Toyota",
    "model": "Camry",
    "year": 2020,
    "color": "Blue",
    "licensePlate": "ABC123"
  }
}
```

#### Update Customer
- **PUT** `/api/v1/customers/:id`
- Body: Partial customer object with fields to update

#### Assign Driver to Customer
- **PUT** `/api/v1/customers/:id/assign-driver`
- Body:
```json
{
  "driverId": 1
}
```

#### Delete Customer
- **DELETE** `/api/v1/customers/:id`
- Returns: Deleted customer details

## Data Models

### Driver Model
```javascript
{
  id: Number,
  name: String,
  phone: String,
  email: String,
  licenseNumber: String,
  vehicleType: String,
  status: String, // 'active', 'inactive'
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Customer Model
```javascript
{
  id: Number,
  name: String,
  phone: String,
  email: String,
  address: String,
  vehicleInfo: {
    make: String,
    model: String,
    year: Number,
    color: String,
    licensePlate: String
  },
  assignedDriverId: Number,
  status: String, // 'waiting_for_recovery', 'assigned_to_driver', 'recovered'
  requestedAt: Date,
  completedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure

```
FastRecovery-backend/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── driverController.js
│   │   └── customerController.js
│   ├── models/              # Data models
│   │   ├── Driver.js
│   │   └── Customer.js
│   ├── routes/              # API routes
│   │   ├── drivers.js
│   │   └── customers.js
│   ├── middleware/          # Custom middleware (future)
│   ├── config/              # Configuration files (future)
│   ├── utils/               # Utility functions (future)
│   └── index.js             # Main application file
├── tests/                   # Test files
│   └── app.test.js
├── coverage/                # Test coverage reports
├── node_modules/            # Dependencies
├── .env.example             # Environment variables example
├── .gitignore              # Git ignore rules
├── jest.config.js          # Jest configuration
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error description",
  "message": "Detailed error message"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Adding New Features

1. Create/update models in `src/models/`
2. Add controller logic in `src/controllers/`
3. Define routes in `src/routes/`
4. Add tests in `tests/`
5. Update documentation

### Testing

The project includes comprehensive tests covering:
- API endpoints
- CRUD operations
- Error handling
- Data validation

Run tests with:
```bash
npm test
```

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Geographic location services
- [ ] Email/SMS notifications
- [ ] Advanced search and filtering
- [ ] Performance monitoring
- [ ] API rate limiting
- [ ] File upload for driver licenses/vehicle photos
- [ ] Reporting and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

ISC License
