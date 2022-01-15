import { Router } from "express";

import ordersController from "../controllers/orders.controller";

const router = Router();

// Path starts /orders/...
router.post("/", ordersController.addOrder);
router.get("/", ordersController.getOrders);
router.get("/success", ordersController.getSuccess);
router.get("/failure", ordersController.getFailure);



export default router;
