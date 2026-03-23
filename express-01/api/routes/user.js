const express = require("express");
const router = express.Router();

const { User, Message } = require("../models");

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "name e email são obrigatórios",
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        error: "Já existe um usuário com esse email",
      });
    }

    const user = await User.create({ name, email });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar usuário",
      details: error.message,
    });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Message,
          as: "messages",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao listar usuários",
      details: error.message,
    });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Message,
          as: "messages",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar usuário",
      details: error.message,
    });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({
          error: "Já existe um usuário com esse email",
        });
      }
    }

    await user.update({
      name: name ?? user.name,
      email: email ?? user.email,
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao atualizar usuário",
      details: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    await user.destroy();

    return res.json({
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao deletar usuário",
      details: error.message,
    });
  }
});

module.exports = router;