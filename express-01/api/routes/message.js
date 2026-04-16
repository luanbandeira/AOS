import { Router } from "express";
import MessageController from "../controllers/message";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", MessageController.getAll);
router.get("/:messageId", MessageController.getById);
router.post("/", MessageController.create);
router.delete("/:messageId", MessageController.remove);

export default router; // 👈 estava faltando isso