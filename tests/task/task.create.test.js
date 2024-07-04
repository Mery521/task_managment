const request = require('supertest');
const app = require('../../app');
const { storeTask } = require('../../services/taskService');

jest.mock('../../services/taskService');

describe('POST /api/tasks', () => {
    let user;
  
    beforeAll( async () => {
        const userData = {
            "email": "john.doe@example.com",
            "password": "hashed_password_1"
        }
        user = await request(app).post("/api/login").send(userData);      
    });
  
    test('should create a new task', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test task',
            status: '1'
        };
  
        storeTask.mockResolvedValue({
            id: 1,
            ...taskData,
            userId: 1,
        });

        const res = await request(app)
            .post('/api/task')
            .set({
                Authorization: 'Bearer ' + user.body.accessToken,
            })
            .send(taskData);
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe(taskData.title);
        expect(res.body.description).toBe(taskData.description);
        expect(res.body.status).toBe(taskData.status);

    });
    test('should return 401 if token is missing', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test task',
            status: '1'
        };

        const res = await request(app)
            .post('/api/task')
            .send(taskData);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Unauthenticated');
    });

    test('should return 401 if token is invalid', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test task',
            status: '1'
        };

        const res = await request(app)
            .post('/api/task')
            .set('Authorization', `Bearer invalidtoken`)
            .send(taskData);

        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid or expired token');
    });
});
