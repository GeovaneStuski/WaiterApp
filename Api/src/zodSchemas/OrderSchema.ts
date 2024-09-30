import zod from 'zod';
import { IDSchema } from './IDSchema';

export const OrderSchema = zod.object({
  table: zod.string({message: 'Table is required'}),
  products: zod.array(zod.object({
    product: IDSchema,
    quantity: zod.number({message: 'Quantity required'}),
  }, {message: 'Product is required to create order'})),
});
