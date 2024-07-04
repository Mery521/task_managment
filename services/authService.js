const { User, AccessToken } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const passwordCheck = await bcrypt.compare(password, user.password);
  if (!passwordCheck) throw new Error('Invalid credentials');

  const userId = user.id;
  const accessToken = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '24h' });
  const refreshToken = jwt.sign({ id: userId }, SECRET_KEY);

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  await AccessToken.create({
    userId,
    access_token: accessToken,
    refresh_token: refreshToken,
    expiresAt,
  });

  return { accessToken, refreshToken };
};

const destroyTokenService = async (accessToken) => {
  await AccessToken.destroy({
    where: { access_token: accessToken }
  });
};

module.exports = {
  loginService,
  destroyTokenService,
};
