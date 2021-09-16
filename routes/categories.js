const { Router } = require("express");
const { check } = require("express-validator");

const { validations } = require("../middlewares/validations");

const router = Router();

//obtener todas las categorías
router.get("/", (req, res) => {
  res.json({ msg: "Todo ok" });
});

//categoría por ID
router.get("/:id", (req, res) => {
  res.json({ msg: "Todo ok id" });
});

//crear categoría
router.post("/", (req, res) => {
  res.json({ msg: "post" });
});

//actualizar categoría
router.put("/:id", (req, res) => {
  res.json({ msg: "put" });
});

//borrar categoría solo si es un administrador
router.delete("/:id", (req, res) => {
  res.json({ msg: "delete" });
});

module.exports = router;
