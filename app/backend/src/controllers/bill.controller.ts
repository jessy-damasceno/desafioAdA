import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import BillService from '../services/bill.service';

class BillController {
  public async getAll(_req: Request, res: Response) {
    const billService = new BillService();
    const billsList = await billService.findAll();

    return res.status(StatusCodes.OK).json(billsList);
  }

  public async getBillsByType(req: Request, res: Response) {
    const billService = new BillService();
    const { type } = req.body;

    const bills = await billService.findBillsByType(type as ('A pagar' | 'A receber'));

    return res.status(StatusCodes.OK).json(bills);
  }
}

export default new BillController();
