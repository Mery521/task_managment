const { loginService, destroyTokenService } = require('../services/authService');
const { validationResult } = require('express-validator');

const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginService(email, password);

    return res.json({
      "accessToken": accessToken,
      "refreshToken": refreshToken,
    });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

const logoutController = async (req, res) => {
  try {
      await destroyTokenService(req.accessToken);
      return res.status(204).send({});
  } catch (error) {
      return res.status(401).send(error.message);
  }
};

module.exports = {
  loginController,
  logoutController,
};
