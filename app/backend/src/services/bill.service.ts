import IBill from '../interfaces/IBill';
import csvSeeder from '../interfaces/@csvSeeder';
import Conta from '../database/models/Conta';
import Reserva from '../database/models/Reserva';
import Propriedade from '../database/models/Propriedade';
import {
  DAYS_OF_WEEK,
  getNextDayOfWeek,
  getDateFromString,
  addDaysTo,
} from '../utils/workingWithDates';

class BillService {
  public async findAll(): Promise<IBill[] | []> {
    return Conta.findAll({
      include: [{ model: Propriedade, as: 'propertyOf' }, { model: Reserva, as: 'reserveOf' }],
    });
  }

  public async findBillsByType(type: ('A pagar' | 'A receber')): Promise<IBill[] | []> {
    const bills: IBill[] | [] = await this.findAll();

    return bills.filter((b) => b.type === type);
  }

  public async createByCsv(reserve: csvSeeder, id: number): Promise<void> {
    await Conta.create(this.toPayFactory(reserve, id));
    await Conta.create(this.toReceiveFactory(reserve, id));
  }

  private toPayFactory(obj: csvSeeder, reserveID: number): IBill {
    const toPay: IBill = {
      type: 'A pagar',
      reserve: reserveID,
      property: parseInt(obj.property, 10),
      price: '',
      dueDate: new Date(),
    };

    toPay.price = obj.extrasWithoutTax;
    toPay.dueDate = getNextDayOfWeek(obj.checkOut, DAYS_OF_WEEK.terca);

    return toPay as IBill;
  }

  private toReceiveFactory(obj: csvSeeder, reserveID: number) {
    const toReceive: IBill = {
      type: 'A receber',
      reserve: reserveID,
      property: parseInt(obj.property, 10),
      price: JSON.stringify(
        parseFloat(obj.totalWithoutTax) - parseFloat(obj.personalizedCommission || '0'),
      ),
      dueDate: new Date(),
    };

    if (obj.portal === 'Booking.com') {
      toReceive.dueDate = getDateFromString(obj.checkOut);
    } else if (obj.portal === 'Airbnb.com') {
      toReceive.dueDate = addDaysTo(obj.checkIn, 5);
    }

    return toReceive;
  }
}

export default new BillService();
