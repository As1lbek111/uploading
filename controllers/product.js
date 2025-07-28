const Product = require("../models/Product");

exports.create = (req, res, next) => {
  Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    images: req.files.map((file) => file.filename),
  })
    .then((product) => res.status(201).json(product))
    .catch(next);
};

exports.getAll = (req, res, next) => {
  const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (minPrice) filter.price = { $gte: minPrice };
  if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };

  Product.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .populate("category")
    .then((products) => res.json(products))
    .catch(next);
};
