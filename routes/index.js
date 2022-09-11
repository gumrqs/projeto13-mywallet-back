
import { Router } from "express";
import authRouter from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();
router.use(authRouter);
router.use(userRoutes);

export default router;