import { Order } from "./order.model";


export interface LoginCustomer {
  email: string;
  password: string;
}

export interface Customer {
  _id?: string;
  lastName: string;
  firstName: string;
  address: string;
  email: string;
  password?: string;
  orders?: Array<Order | null>;
}
