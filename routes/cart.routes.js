import { Router } from "express";

import cartController from "../controllers/cart.controller";

const router = Router();

// Path starts /cart/...
router.get("/", cartController.getCart);

router.post("/items", cartController.addCartItem);

router.patch("/items", cartController.updateCartItem);


export default router;
