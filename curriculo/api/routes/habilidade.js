import { Router } from "express";
import HabilidadeController from "../controllers/habilidadeController";

const router = Router();

router.get("/", HabilidadeController.getAll);
router.get("/:id", HabilidadeController.getById);
router.post("/", HabilidadeController.create);
router.put("/:id", HabilidadeController.update);
router.delete("/:id", HabilidadeController.remove);

export default router;