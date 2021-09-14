const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Verifica primero el token antes que el rol",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }

  next();
};

const itHaveRole = (...role) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Verifica primero el token antes que el rol",
      });
    }

    if (!role.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere de uno de estos roles ${role}`,
      });
    }

    next();
  };
};

module.exports = { isAdminRole, itHaveRole };
