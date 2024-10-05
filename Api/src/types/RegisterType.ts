export type RegisterType = {
  _id: string;
  table: string;
  createdAt: Date;
  products: {
    product: string;
    quantity: number;
  }[];
}
