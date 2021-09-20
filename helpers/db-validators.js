const Role = require("../models/role");
const { User, Category, Product } = require("../models");

const isRoleValid = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no está registrado en la base de datos`);
  }
};

const checkIfMailExists = async (mail = "") => {
  const mailExist = await User.findOne({ mail });
  if (mailExist) {
    throw new Error(`el mail ${mail} ya está registrado en la base de datos`);
  }
};

const checkIfUserExists = async (id = "") => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`el id ${id} no existe`);
  }
};

const checkIfCategoryExists = async (id) => {
  const categoryExists = await Category.findById(id);

  if (!categoryExists) {
    throw new Error(`La categoría con el id ${id} no existe`);
  }
};

const checkIfProductExists = async (id) => {
  const productExists = await Product.findById(id);

  if (!productExists) {
    throw new Error(`El producton con el id ${id} no existe`);
  }
};

module.exports = {
  isRoleValid,
  checkIfMailExists,
  checkIfUserExists,
  checkIfCategoryExists,
  checkIfProductExists,
};
