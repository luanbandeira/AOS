const express = require("express");
const router = express.Router();

const { Message, User } = require("../models");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text || !userId) {
      return res.status(400).json({
        error: "text e userId são obrigatórios",
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    const message = await Message.create({ text, userId });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar mensagem",
      details: error.message,
    });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao listar mensagens",
      details: error.message,
    });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!message) {
      return res.status(404).json({
        error: "Mensagem não encontrada",
      });
    }

    return res.json(message);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar mensagem",
      details: error.message,
    });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { text, userId } = req.body;

    const message = await Message.findByPk(req.params.id);

    if (!message) {
      return res.status(404).json({
        error: "Mensagem não encontrada",
      });
    }

    if (userId) {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          error: "Usuário informado não existe",
        });
      }
    }

    await message.update({
      text: text ?? message.text,
      userId: userId ?? message.userId,
    });

    return res.json(message);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao atualizar mensagem",
      details: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);

    if (!message) {
      return res.status(404).json({
        error: "Mensagem não encontrada",
      });
    }

    await message.destroy();

    return res.json({
      message: "Mensagem deletada com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao deletar mensagem",
      details: error.message,
    });
  }
});

module.exports = router;