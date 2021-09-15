const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Nombre obligatorio"],
  },
  mail: {
    type: String,
    required: [true, "Mail obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Contraseña obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "USER_ROLE",
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...rest } = this.toObject();
  rest.uid = _id;

  return rest;
};

module.exports = model("User", userSchema);
