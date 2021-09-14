const { Router } = require("express");
const { check } = require("express-validator");

const { validations } = require("../middlewares/validations");

const { login } = require("../controllers/auth");

const router = Router();

router.post(
  "/login",
  [
    check("mail", "el mail es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validations,
  ],
  login
);

module.exports = router;
