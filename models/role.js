const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "rol obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
