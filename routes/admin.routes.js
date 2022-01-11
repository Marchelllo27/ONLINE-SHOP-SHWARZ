import { Router } from "express";
import adminController from "../controllers/admin.controller";
import imageUploadMiddleware from "../middlewares/image-upload";

const router = Router();

router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProduct);

router.post(
  "/products",
  imageUploadMiddleware,
  adminController.createNewProduct
);

export default router;