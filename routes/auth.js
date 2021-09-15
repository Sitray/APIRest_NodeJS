const { Router } = require("express");
const { check } = require("express-validator");

const { validations } = require("../middlewares/validations");

const { login, googleSignin } = require("../controllers/auth");

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

router.post(
  "/google",
  [check("id_token", "el id_token es necesario").not().isEmpty(), validations],
  googleSignin
);

module.exports = router;
