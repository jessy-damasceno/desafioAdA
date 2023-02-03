/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

const headers = {
  Referência: 'reference',
  Data: 'date',
  'Data de check-in': 'checkIn',
  'Data de check-out': 'checkOut',
  'Aluguer com imposto': 'rentPrice',
  'Aluguer sem imposto': 'rentWithoutTax',
  'Imposto do aluguer': 'rentTax',
  'Extras com imposto': 'extras',
  'Extras sem imposto': 'extrasWithoutTax',
  'Imposto dos extras': 'extrasTax',
  'Total da reserva com imposto': 'total',
  'Total da reserva sem imposto': 'totalWithoutTax',
  'Total imposto': 'totalTax',
  Pagamento: 'payment',
  Pendente: 'pending',
  'Nome alojamento': 'property',
  Localidade: 'locality',
  Portal: 'portal',
  'Comissão portal/intermediário: comissão calculada': 'calculatedCommission',
  'Comissão portal/intermediário: comissão personalizada':
    'personalizedCommission',
};

const csvFilePath = path.resolve(__dirname, '../../reservas.csv');
const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
const columns = Object.keys(headers);
const newColumns = Object.values(headers);

(() => {
  parse(
    fileContent,
    {
      delimiter: ',',
      columns,
    },
    (error, result) => {
      if (error) {
        console.error(error);
      }
      result.shift();

      result.forEach((item: never) => columns.forEach((column, i) => {
        item[newColumns[i] as keyof typeof item] = item[column];
        delete item[column];
      }));
      fs.writeFile(
        path.resolve(__dirname, '../backups/reservas.js'),
        JSON.stringify(result),
        (err) => err && console.log(err),
      );
    },
  );
})();
