const { response } = require("express");
const { Category } = require("../models");

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${categoryDB.name} ya existe`,
    });
  }

  //generar los datos para guardar
  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);

  //guardar en db
  await category.save();

  res.status(201).json(category);
};

//obtener categorias paginado-total- populate

const getCategories = async (req, res = response) => {
  const { limit = 5, start = 0 } = req.query;

  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate("user", "name")
      .limit(Number(limit))
      .skip(Number(start)),
  ]);

  res.json({
    total,
    categories,
  });
};

//obtener categoria regresar categoria

const getCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");

  res.json({
    category,
  });
};

//actualizar categoria

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...rest } = req.body;

  rest.name = rest.name.toUpperCase();
  rest.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    category,
  });
};

//borrar categoria

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { state: false });

  res.json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
