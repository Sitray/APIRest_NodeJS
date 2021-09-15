const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { mail, password } = req.body;

  try {
    //verificar si el mail existe
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario/password no son correctas",
      });
    }

    // si el usuario está activo
    if (!user.state) {
      return res.status(400).json({
        msg: "el usuario no está activo",
      });
    }
    // verificar contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Password no es correcta",
      });
    }

    //generar JWT

    const token = await generateJWT(user.id);

    res.json({
      msg: "login",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: "algo salió mal" });
  }
};

const googleSignin = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { mail, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ mail });

    if (!user) {
      //crear usuario
      const data = {
        name,
        mail,
        password: "a",
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    //si el usuario está bloqueado
    if (!user.state) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
      msg: "hola",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { login, googleSignin };
