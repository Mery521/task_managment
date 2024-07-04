const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, AccessToken } = require('../../models');
const loginService = require('../../services/authService').loginService;

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../models', ()=> ({
    User: {
        findOne: jest.fn(),
    },    
    AccessToken: {
        create: jest.fn(),
    },
}));

const SECRET_KEY = process.env.SECRET_KEY;

describe('loginService', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should throw an error if the user is not found', async () => {
        User.findOne.mockResolvedValue(null);

        await expect(loginService('john.doe@example.com', 'hashed_password_1')).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error if the password is incorrect', async () => {
        User.findOne.mockResolvedValue({ id: 1, password: 'hashed_password_1' });
        bcrypt.compare.mockResolvedValue(false);

        await expect(loginService('john.doe@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });

    it('should create tokens and return', async () => {
        const userId = 1;
        User.findOne.mockResolvedValue({ id: userId, password: 'hashed_password_1' });
        bcrypt.compare.mockResolvedValue(true);

        const mockAccessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '24h' });
        const mockRefreshToken = jwt.sign({ id: userId }, SECRET_KEY);

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);
        AccessToken.create.mockResolvedValue({
            userId,
            access_token: mockAccessToken, 
            refresh_token: mockRefreshToken, 
            expiresAt 
        });

        const { accessToken, refreshToken } = await loginService('john.doe@example.com', 'hashed_password_1');
        expect(accessToken).toBe(mockAccessToken);
        expect(refreshToken).toBe(mockRefreshToken);
    });
});