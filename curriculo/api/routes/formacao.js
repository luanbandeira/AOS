import { Router } from "express";
import FormacaoController from "../controllers/formacaoController";

const router = Router();

router.get("/", FormacaoController.getAll);
router.get("/:id", FormacaoController.getById);
router.post("/", FormacaoController.create);
router.put("/:id", FormacaoController.update);
router.delete("/:id", FormacaoController.remove);

export default router;