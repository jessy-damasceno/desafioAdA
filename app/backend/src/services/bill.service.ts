import IBill from '../interfaces/IBill';
import Conta from '../database/models/Conta';
// import Reserva from '../database/models/Reserva';
import Propriedade from '../database/models/Propriedade';

class BillService {
  public async findAll(): Promise<IBill[] | []> {
    return Conta.findAll({
      include: [{ model: Propriedade, as: 'propertyOf' }],
    });
  }

  public async findBillsByType(type: ('A pagar' | 'A receber')): Promise<IBill[] | []> {
    const bills: IBill[] | [] = await this.findAll();

    return bills.filter((b) => b.type === type);
  }
}

export default new BillService();
