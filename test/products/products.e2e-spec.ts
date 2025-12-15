import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';
import request from 'supertest';

describe('Products Module', () => {
  const app = APP_URL;
  let apiToken;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        apiToken = body.token;
      });
  });

  describe('Get many with relations', () => {
    it('should get list of products with relations: /api/v1/products/with-relations (GET)', () => {
      return request(app)
        .get(`/api/v1/products/with-relations`)
        .auth(apiToken, {
          type: 'bearer',
        })
        .expect(200)
        .send()
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          if (body.data.length > 0) {
            expect(body.data[0].categories).toBeDefined();
            expect(body.data[0].generics).toBeDefined();
          }
        });
    });
  });
});
