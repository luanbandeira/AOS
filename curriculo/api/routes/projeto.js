import { Router } from "express";
import ProjetoController from "../controllers/projetoController";

const router = Router();

router.get("/", ProjetoController.getAll);
router.get("/:id", ProjetoController.getById);
router.post("/", ProjetoController.create);
router.put("/:id", ProjetoController.update);
router.delete("/:id", ProjetoController.remove);

export default router;