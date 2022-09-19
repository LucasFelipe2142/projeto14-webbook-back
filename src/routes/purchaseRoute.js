import express from 'express';
import * as purchasesController from '../controller/purchasesController.js';
import hasUser from '../middlewares/authorization.middleware.js';


const router = express.Router();

router.post('/purchases',hasUser, purchasesController.purchasesPost);
    

export default router;
