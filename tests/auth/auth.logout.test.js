const request = require('supertest');
const app = require('../../app');

describe('POST /api/logout', () => {
    let user;
  
    beforeAll( async () => {
        const userData = {
            "email": "john.doe@example.com",
            "password": "hashed_password_1"
        }
        user = await request(app).post("/api/login").send(userData);      
    });
  
    test('can logout', async () => {
        const res = await request(app)
            .post('/api/logout')
            .set({
                Authorization: 'Bearer ' + user.body.accessToken,
            });
    
        expect(res.status).toBe(204);
    });
});
