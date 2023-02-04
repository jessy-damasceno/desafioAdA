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

  public async findAll(req: Request, res: Response) {
    const reserveService = new ReserveService();

    const reserves = await reserveService.findAll();

    return res.status(StatusCodes.OK).json(reserves);
  }
}

export default new ReserveController();
