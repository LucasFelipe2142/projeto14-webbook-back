/* eslint-disable require-jsdoc */
import express from 'express';
import cors from 'cors';
import loginRoutes from './routes/loginRoutes.js';
import cartRoute from './routes/cartRoute.js';
import registrateRouters from './routes/resgistrateRoutes.js';
import bookRouter from './routes/bookRouter.js';
const app = start();

app.use(registrateRouters);

app.use(bookRouter);

app.use(loginRoutes);

app.use(cartRoute);

// app.listen(5000);
// console.log("server running on port 5000");

app.listen(process.env.PORT, () => {
  console.log('Server running on port ' + process.env.PORT);
});

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}
