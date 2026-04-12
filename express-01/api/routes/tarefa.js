import { Router } from "express";
import TarefaController from "../controllers/tarefaController";

const router = Router();

router.get("/", TarefaController.getAll);
router.get("/:objectId", TarefaController.getByObjectId);
router.post("/", TarefaController.create);
router.put("/:objectId", TarefaController.update);
router.delete("/:objectId", TarefaController.remove);

export default router;