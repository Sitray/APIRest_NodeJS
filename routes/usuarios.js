const { Router } = require("express");
const { check } = require("express-validator");

const {
  validateJWT,
  validations,
  itHaveRole,
  isAdminRole,
} = require("../middlewares");

const {
  isRoleValid,
  checkIfMailExists,
  checkIfUserExists,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("_id", "No es un ID válido").isMongoId(),
    check("id").custom(checkIfUserExists),
    check("role").custom(isRoleValid),
    validations,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("name", "nombre es obligatorio").not().isEmpty(),
    check("password", "password obligatorio y de más de 6 letras").isLength({
      min: 6,
    }),
    check("mail", "no es un mail válido").isEmail(),
    check("role").custom(isRoleValid),
    check("mail").custom(checkIfMailExists),
    validations,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validateJWT,
    //isAdminRole,
    itHaveRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(checkIfUserExists),
    validations,
  ],
  usuariosDelete
);

module.exports = router;
