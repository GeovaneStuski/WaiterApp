import { Router } from 'express';
import path from 'node:path';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategory';
import { createCategory } from './app/useCases/categories/createCategory';

import {listProducts} from './app/useCases/products/listProducts';
import {createProduct} from './app/useCases/products/createProduct';
import listProductsByCategory from './app/useCases/categories/listProductsByCategory';
import { listOrder } from './app/useCases/orders/listOrder';
import { createOrder } from './app/useCases/orders/createOrder';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req,file,callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

router.get('/categories', listCategories);

router.post('/categories', createCategory);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProduct);

router.get('/categories/:categoryId/products', listProductsByCategory);

router.get('/orders', listOrder);

router.post('/orders', createOrder);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrder);


