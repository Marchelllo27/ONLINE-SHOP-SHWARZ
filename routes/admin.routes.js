import { Router } from "express";
import adminController from "../controllers/admin.controller";
import imageUploadMiddleware from "../middlewares/image-upload";

const router = Router();
//path starts /admin/...
router.get("/products", (req, res ) => {

});

router.get("/products/new", adminController.getNewProduct);

router.post("/products",imageUploadMiddleware,adminController.createNewProduct);

router.get("/products/:id", adminController.getUpdateProduct);

router.post("/products/:id",imageUploadMiddleware, adminController.updateProduct);

router.delete("/products/:id", adminController.deleteProduct);

router.get('/orders', adminController.getOrders);

router.patch('/orders/:id', adminController.updateOrder);




export default router;
