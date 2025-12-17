import { APP_URL, TESTER_EMAIL, TESTER_PASSWORD } from '../utils/constants';
import request from 'supertest';

describe('Suppliers Module', () => {
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
    it('should get list of suppliers: /api/v1/suppliers (GET)', () => {
      return request(app)
        .get(`/api/v1/suppliers`)
        .auth(apiToken, {
          type: 'bearer',
        })
        .expect(200)
        .send()
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          if (body.data.length > 0) {
            expect(body.data[0].name).toBeDefined();
          }
        });
    });

    it('should get 401 Unathorized Error: /api/v1/suppliers (GET)', () => {
      return request(app)
        .get(`/api/v1/suppliers`)
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
