export default interface IReserve {
  id?: number;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  rentPrice: string;
  rentTax: number;
  property: number;
  locality: string;
  extrasPrice: number;
  extrasTax: number;
  total: string;
  payment: string;
  pending: boolean;
  portal: string;
}
