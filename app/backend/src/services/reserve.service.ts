import { getDateFromString } from '../utils/workingWithDates';
import csvSeeder from '../interfaces/@csvSeeder';
import IReserve from '../interfaces/IReserve';
import Propriedade from '../database/models/Propriedade';
import Reserva from '../database/models/Reserva';
import billService from './bill.service';
// eslint-disable-next-line import/no-cycle
// import billService from './bill.service';

class ReserveService {
  public async findAll(): Promise<IReserve[] | []> {
    return Reserva.findAll({
      include: [{ model: Propriedade, as: 'propertyCOD' }],
    });
  }

  public async create(reserves: csvSeeder[]) {
    const properties = [...new Set(reserves
      .map(({ property }) => JSON.stringify({ id: property })))].map((a) => JSON.parse(a));

    await Promise.all(properties.map((p) => Propriedade.findOrCreate({ where: p })));

    const newReserves = await Promise.all(
      reserves.map((reserve) => Reserva.create(this.reserveFactory(reserve))),
    );

    await Promise.all(reserves.map((reserve, index) => billService
      .createByCsv(reserve, newReserves[index].id)));
  }

  public reserveFactory(reserva: csvSeeder): IReserve {
    const result = {
      checkIn: getDateFromString(reserva.checkIn),
      checkOut: getDateFromString(reserva.checkOut),
      rentPrice: reserva.rentPrice,
      rentTax: parseInt(reserva.rentTax, 10),
      property: parseInt(reserva.property, 10),
      locality: reserva.locality,
      extrasPrice: parseInt(reserva.extras, 10),
      extrasTax: parseInt(reserva.extrasTax, 10),
      total: reserva.total,
      payment: reserva.payment,
      pending: reserva.total !== reserva.payment, // válido porque pagamento nunca é maior que o total
      portal: reserva.portal,
    };
    return result;
  }
}

export default ReserveService;
