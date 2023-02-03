import { Router } from 'express';
import billController from '../controllers/bill.controller';

const billRouter = Router();

billRouter.get('/', billController.getAll); // GET todas as contas
billRouter.get('/type', billController.getBillsByType); // GET todas as contas a pagar ou a receber

export default billRouter;
