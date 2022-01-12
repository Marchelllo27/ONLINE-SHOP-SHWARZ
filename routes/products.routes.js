import express from "express";
import productsController from "../controllers/products.controller";

const router = express.Router();

router.get("/products", productsController.getAllProduct);

router.get("/products/:id", productsController.getProductDetails);

export default router;
