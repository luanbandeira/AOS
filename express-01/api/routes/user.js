import { Router } from "express";
import UserController from "../controllers/user";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:userId", UserController.getById);

router.post("/", (req, res) => {
  return res.send("POST HTTP method on user resource");
});

router.put("/:userId", (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

router.delete("/:userId", (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

export default router;