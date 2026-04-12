import { Router } from "express";
import PessoaController from "../controllers/pessoaController";

const router = Router();

router.get("/", PessoaController.getAll);
router.get("/:id", PessoaController.getById);
router.post("/", PessoaController.create);
router.put("/:id", PessoaController.update);
router.delete("/:id", PessoaController.remove);

export default router;