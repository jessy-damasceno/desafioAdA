export default interface IBill {
  id: number;
  type: 'A pagar' | 'A receber';
  reserve: number;
  property: number;
  price: string;
  dueDate: Date;
}
