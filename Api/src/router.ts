import { Router } from 'express';
import path from 'node:path';
import multer from 'multer';

import { AuthMiddleware } from './app/middlewares/AuthMiddleware';
import UsersController from './app/controllers/UsersController';
import CategoriesController from './app/controllers/CategoriesController';
import IngredientsController from './app/controllers/IngredientsController';
import ProductsController from './app/controllers/ProductsController';
import OrdersController from './app/controllers/OrdersController';

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

router.post('/authentication', UsersController.authenticate);

router.use(AuthMiddleware);

router.get('/users', UsersController.index);
router.get('/me', UsersController.getUserById);
router.post('/users', UsersController.store);
router.put('/users/:id', UsersController.update);
router.delete('/users/:id', UsersController.delete);

router.get('/categories', CategoriesController.index);
router.post('/categories', CategoriesController.store);
router.put('/categories/:id', CategoriesController.update);
router.delete('/categories/:id', CategoriesController.delete);

router.get('/ingredients', IngredientsController.index);
router.post('/ingredients', IngredientsController.store);
router.put('/ingredients/:id', IngredientsController.update);
router.delete('/ingredients/:id', IngredientsController.delete);

router.get('/products', ProductsController.index);
router.post('/products', upload.single('image'), ProductsController.store);
router.put('/products/:id', upload.single('image'), ProductsController.update);
router.delete('/products/:id', ProductsController.delete);
router.get('/categories/:categoryId/products', ProductsController.show);

router.get('/orders', OrdersController.index);
router.post('/orders', OrdersController.store);
router.patch('/orders/:id', OrdersController.update);
router.delete('/orders/:id', OrdersController.delete);
router.get('/registers', OrdersController.finishedOrders);



