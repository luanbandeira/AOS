const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const messageRoutes = require("./message");

router.get("/", (req, res) => {
  return res.send(
    `Received a GET HTTP method Servidor rodando! ${process.env.MESSAGE}`
  );
});

router.use("/users", userRoutes);
router.use("/messages", messageRoutes);

module.exports = router;