import {Router} from "express";

import auth from "../controllers/auth.controller";

const router = Router();

router.get("/signup", auth.getSignUp);
router.post("/signup", auth.postSignUp);

router.get("/login", auth.getLogin);
router.post("/login", auth.postLogin);

router.post("/logout", auth.logOut);

export default router;
