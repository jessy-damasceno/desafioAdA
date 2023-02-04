import { Router } from 'express';
import reserveController from '../controllers/reserve.controller';

const reserveRouter = Router();

reserveRouter.get('/', reserveController.findAll);
reserveRouter.post('/', reserveController.create); // POST inclui novos no db

export default reserveRouter;
