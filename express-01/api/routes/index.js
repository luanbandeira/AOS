const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const messageRoutes = require("./message");

router.get("/", (req, res) => {
  return res.json({
    message: "API funcionando",
  });
});

router.use("/users", userRoutes);
router.use("/messages", messageRoutes);

module.exports = router;