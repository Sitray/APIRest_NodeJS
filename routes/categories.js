const { Router } = require("express");
const { check } = require("express-validator");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { checkIfCategoryExists } = require("../helpers/db-validators");
const { isAdminRole } = require("../middlewares");

const { validateJWT } = require("../middlewares/validate-jwt");
const { validations } = require("../middlewares/validations");

const router = Router();

//obtener todas las categorías
router.get("/", [getCategories]);

//categoría por ID
router.get(
  "/:id",
  [
    check("id", "el id no es válido").isMongoId(),
    check("id").custom(checkIfCategoryExists),
    validations,
  ],
  getCategory
);

//check("id").custom(existecategoria)
//crear categoría
router.post(
  "/",
  [
    validateJWT,
    check("name", "el nombre es obligatorio").not().isEmpty(),
    validations,
  ],
  createCategory
);

//actualizar categoría
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("id").custom(checkIfCategoryExists),
    validations,
  ],
  updateCategory
);

//borrar categoría solo si es un administrador
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "el id no es válido").isMongoId(),
    check("id").custom(checkIfCategoryExists),
    validations,
  ],
  deleteCategory
);

module.exports = router;
