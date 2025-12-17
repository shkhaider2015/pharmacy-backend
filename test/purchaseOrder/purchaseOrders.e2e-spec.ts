import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';
import request from 'supertest';

describe('Purchase Orders Module', () => {
  const app = APP_URL;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });
  });

  describe('Get many', () => {
    it('should get list of purchase Orders: /api/v1/purchase-orders (GET)', () => {
      return request(app)
        .get(`/api/v1/purchase-orders`)
        .auth(apiToken, {
          type: 'bearer',
        })
        .expect(200)
        .send()
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          if (body.data.length > 0) {
            expect(body.data[0].orderDate).toBeDefined();
          }
        });
    });

    it('should get 401 Unathorized Error: /api/v1/purchase-orders (GET)', () => {
      return request(app)
        .get(`/api/v1/purchase-orders`)
        .auth('MyFakeAPIToken', {
          type: 'bearer',
        })
        .expect(401)
        .send()
        .expect(({ body }) => {
          expect(body.message).toBeDefined();
        });
    });
  });
});

describe('Purchase Order Items Module', () => {
  const app = APP_URL;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: TESTER_EMAIL, password: TESTER_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });
  });

  describe('Get many', () => {
    it('should get list of purchase Order Items: /api/v1/purchase-order-items (GET)', () => {
      return request(app)
        .get(`/api/v1/purchase-order-items`)
        .auth(apiToken, {
          type: 'bearer',
        })
        .expect(200)
        .send()
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          if (body.data.length > 0) {
            expect(body.data[0].orderQuantity).toBeDefined();
          }
        });
    });

    it('should get 401 Unathorized Error: /api/v1/purchase-order-items (GET)', () => {
      return request(app)
        .get(`/api/v1/purchase-order-items`)
        .auth('MyFakeAPIToken', {
          type: 'bearer',
        })
        .expect(401)
        .send()
        .expect(({ body }) => {
          expect(body.message).toBeDefined();
        });
    });
  });
});
