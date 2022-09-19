/* eslint-disable new-cap */
import express from 'express';
import * as cartController from '../controller/cartController.js';
import hasUser from '../middlewares/authorization.middleware.js';


const router = express.Router();

router.get('/cart', hasUser, cartController.cartGet );

router.post('/cart', hasUser, cartController.cartInsert);

router.delete('/cart', hasUser, cartController.cartClean);


export default router;
