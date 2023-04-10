export interface Product {
  _id?: string;
  name: string;
  manufacturer: string;
  weldTech: string;
  price: number;
  imageUrl: string;
  quantity?: number;
}
