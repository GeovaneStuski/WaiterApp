import { Product } from './Product';

export type Register = {
  _id: string;
  table: string;
  createdAt: Date,
  products: [{
      product: Product,
      quantity: 2,
    }
  ],
}
