module.exports = {
    testEnvironment: 'node',
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
      SECRET_KEY: process.env.SECRET_KEY,
    },
  };