const Category = require("../models/Category");

exports.create = async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      image: req.file.filename,
    });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "category ochirildi" });
  } catch (err) {
    next(err);
  }
};
