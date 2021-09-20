const { Router } = require("express");
const { check } = require("express-validator");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  checkIfCategoryExists,
  checkIfProductExists,
} = require("../helpers/db-validators");
const { isAdminRole } = require("../middlewares");

const { validateJWT } = require("../middlewares/validate-jwt");
const { validations } = require("../middlewares/validations");

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "el id no es válido").isMongoId(),
    check("id").custom(checkIfProductExists),
    validations,
  ],
  getProduct
);

router.post(
  "/",
  [
    validateJWT,
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("category", "No es una ID de Mongo").isMongoId(),
    check("category").custom(checkIfCategoryExists),

    validations,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validateJWT,
    // check("category", "No es una ID de Mongo").isMongoId(),
    check("id").custom(checkIfProductExists),
    validations,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "el id no es válido").isMongoId(),
    check("id").custom(checkIfProductExists),
    validations,
  ],
  deleteProduct
);

module.exports = router;
