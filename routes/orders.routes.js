import { Router } from "express";

import ordersController from "../controllers/orders.controller";

const router = Router();

// Path starts /orders/...
router.post("/", ordersController.addOrder);
router.get("/", ordersController.getOrders);



export default router;
