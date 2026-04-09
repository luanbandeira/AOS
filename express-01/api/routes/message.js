import { Router } from "express";
import MessageController from "../controllers/message";

const router = Router();

router.get("/", MessageController.getAll);
router.get("/:messageId", MessageController.getById);
router.post("/", MessageController.create);
router.delete("/:messageId", MessageController.remove);

export default router;