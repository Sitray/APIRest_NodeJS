const { response } = require("express");
const { Product } = require("../models");

const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${productDB.name} ya existe`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const getProducts = async (req, res = response) => {
  const { limit = 5, start = 0 } = req.query;

  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("user", "name")
      .populate("category", "nombre")
      .limit(Number(limit))
      .skip(Number(start)),
  ]);

  res.json({
    total,
    products,
  });
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json({
    product,
  });
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...rest } = req.body;

  if (rest.name) {
    rest.name = rest.name.toUpperCase();
  }

  rest.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    product,
    id,
  });
};

//borrar categoria

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
