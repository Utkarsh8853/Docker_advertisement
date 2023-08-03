import express from "express";
import { productController } from "../controllers/product.controller";
import auth from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";
import { addProductValidator, biddingValidator, updateProductValidator } from "../middleware/joiValidate.middleware";

export const productRouter = express.Router();

productRouter.post('/addProduct', addProductValidator, auth, productController.addProduct);
productRouter.get('/viewProduct', auth, productController.viewProduct);
productRouter.post('/addProductImage', auth, upload.single('photo'),auth,productController.addProductImage);
productRouter.put('/bidding', biddingValidator, auth,productController.bidding);
productRouter.put('/updateProduct', updateProductValidator, auth, productController.updateProduct);
productRouter.delete('/remove', auth, productController.removeProduct);
productRouter.post('/filter', auth, productController.filter);
productRouter.delete('/removeProductImage', auth, productController.removeProductImage);