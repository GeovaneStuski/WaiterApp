import { Router } from 'express';
// import path from 'node:path';
// import multer from 'multer';

import { AuthMiddleware } from './app/middlewares/AuthMiddleware';
import UsersController from './app/controllers/UsersController';
import CategoriesController from './app/controllers/CategoriesController';
import IngredientsController from './app/controllers/IngredientsController';

export const router = Router();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req,file,callback) {
//       callback(null, path.resolve(__dirname, '..', 'uploads'));
//     },
//     filename(req, file, callback) {
//       callback(null, `${Date.now()}-${file.originalname}`);
//     },
//   })
// });

router.post('/login', UsersController.authenticate);

router.use(AuthMiddleware);

router.get('/users', UsersController.index);
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

// router.get('/products', listProducts);
// router.post('/products', upload.single('image'), createProduct);
// router.put('/products/:id', upload.single('image'), editProduct);
// router.delete('/products/:id', deleteProduct);
// router.get('/categories/:categoryId/products', listProductsByCategory);


// router.get('/orders', listOrder);
// router.post('/orders', createOrder);
// router.patch('/orders/:orderId', changeOrderStatus);
// router.delete('/orders/:orderId', cancelOrder);



