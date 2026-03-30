import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const messages = await req.context.models.Message.findAll();
    return res.send(messages);
  } catch (err) {
    next(err);
  }
});

router.get("/:messageId", async (req, res, next) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId,
    );
    return res.send(message);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.text) {
      const error = new Error("O campo 'text' é obrigatório.");
      error.status = 400;
      return next(error);
    }

    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.send(message);
  } catch (err) {
    next(err);
  }
});

router.delete("/:messageId", async (req, res, next) => {
  try {
    await req.context.models.Message.destroy({
      where: { id: req.params.messageId },
    });
    return res.send(true);
  } catch (err) {
    next(err);
  }
});

export default router;