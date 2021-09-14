const Role = require("../models/role");
const User = require("../models/user");

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
module.exports = { isRoleValid, checkIfMailExists, checkIfUserExists };
