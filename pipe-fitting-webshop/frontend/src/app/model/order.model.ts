export interface Order {
  _id?: string;
  number?: number;
  date?: string;
  deliveryAddress: string;
  paidAmount: number;
  customer?: string;
}
