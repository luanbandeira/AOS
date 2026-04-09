import { Router } from "express";
import SessionController from "../controllers/session";

const router = Router();

router.get("/", SessionController.getMe);

export default router;