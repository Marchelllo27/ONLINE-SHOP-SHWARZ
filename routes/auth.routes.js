import express from "express";

import {
  getSignup,
  getLogin,
  signUp,
  login,
  logout
} from "../controllers/auth.controller";

const router = express.Router();

router.get("/signup", getSignup);
router.post("/signup", signUp);

router.get("/login", getLogin);
router.post("/login", login);

router.post('/logout', logout)

export default router;
