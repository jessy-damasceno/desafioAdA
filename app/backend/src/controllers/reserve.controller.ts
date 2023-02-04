import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import ReserveService from '../services/reserve.service';

class ReserveController {
  public async create(req: Request, res: Response) {
    const reserveService = new ReserveService();

    const reserves = req.body;

    reserveService.create(reserves);

    return res.status(StatusCodes.CREATED).json({ message: 'Created' });
  }
}

export default new ReserveController();
