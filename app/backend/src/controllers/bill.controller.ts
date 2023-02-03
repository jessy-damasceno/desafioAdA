import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import BillService from '../services/bill.service';

class BillController {
  constructor(private billService = BillService) { }

  public getAll = async (_req: Request, res: Response) => {
    const billsList = await this.billService.findAll();

    return res.status(StatusCodes.OK).json(billsList);
  };

  public getBillsByType = async (req: Request, res: Response) => {
    const { type } = req.body;
    const bills = await this.billService.findBillsByType(type as ('A pagar' | 'A receber'));

    return res.status(StatusCodes.OK).json(bills);
  };
}

export default new BillController();
