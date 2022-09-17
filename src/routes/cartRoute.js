import express from 'express';
import * as cartController from '../controller/cartController';
import hasUser from '../middlewares/authorization.middleware';



const router = express.Router();

router.get('/cart',hasUser, cartController.cartGet );

router.post('/cart',hasUser, cartController.cartInsert)


export default router;
