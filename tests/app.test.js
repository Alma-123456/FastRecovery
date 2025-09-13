const request = require('supertest');
const app = require('../src/index');

describe('FastRecovery Backend API', () => {
  describe('GET /', () => {
    it('should return welcome message with API info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.message).toBe('Welcome to FastRecovery Backend API');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Route not found');
    });
  });
});

describe('Drivers API', () => {
  describe('GET /api/v1/drivers', () => {
    it('should return all drivers', async () => {
      const response = await request(app)
        .get('/api/v1/drivers')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/drivers/active', () => {
    it('should return active drivers', async () => {
      const response = await request(app)
        .get('/api/v1/drivers/active')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/drivers/:id', () => {
    it('should return driver by ID', async () => {
      const response = await request(app)
        .get('/api/v1/drivers/1')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', 1);
    });

    it('should return 404 for non-existent driver', async () => {
      const response = await request(app)
        .get('/api/v1/drivers/999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Driver not found');
    });
  });
});

describe('Customers API', () => {
  describe('GET /api/v1/customers', () => {
    it('should return all customers', async () => {
      const response = await request(app)
        .get('/api/v1/customers')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/v1/customers/:id', () => {
    it('should return customer by ID', async () => {
      const response = await request(app)
        .get('/api/v1/customers/1')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('id', 1);
    });

    it('should return 404 for non-existent customer', async () => {
      const response = await request(app)
        .get('/api/v1/customers/999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Customer not found');
    });
  });
});