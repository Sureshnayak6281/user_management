const express = require('express');
const { sequelize } = require('./model/user');
const userRouter = require('./route/user');
const app = express();
const PORT = 3000;

app.use(express.json());


app.use('/', userRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
