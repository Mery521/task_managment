const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

sequelize.sync({ force: false }).then(() => {
  if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  }
});

module.exports = app;
