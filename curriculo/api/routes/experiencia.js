import { Router } from "express";
import ExperienciaController from "../controllers/experienciaController";

const router = Router();

router.get("/", ExperienciaController.getAll);
router.get("/:id", ExperienciaController.getById);
router.post("/", ExperienciaController.create);
router.put("/:id", ExperienciaController.update);
router.delete("/:id", ExperienciaController.remove);

export default router;