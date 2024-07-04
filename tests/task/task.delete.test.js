const Task = require('../../models').Task;
const request = require('supertest');
const app = require('../../app');

jest.mock('../../services/taskService');

describe('DELETE /api/task', () => {
    let user;
  
    beforeAll( async () => {
        const userData = {
            "email": "john.doe@example.com",
            "password": "hashed_password_1"
        }
        user = await request(app).post("/api/login").send(userData);      
    });

    it('should delete the task', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test task',
            status: '2'
        };
        
        const newTask = await Task.create({
            ...taskData,
            userId: 1
        });

        const res = await request(app)
            .delete('/api/task/' + newTask.id)
            .set({
                Authorization: 'Bearer ' + user.body.accessToken,
            })
            .send(taskData);
            
        expect(res.status).toBe(204);
    });
});
