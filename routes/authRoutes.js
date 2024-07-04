const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const { loginController, logoutController } = require('../controllers/authController');
const { validateLogin } = require('../validators/auth/authValidator');

router.post('/login', validateLogin, loginController);
router.post('/logout', authenticateToken, logoutController);

module.exports = router;