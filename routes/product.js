const express = require("express");
const router = express.Router();
const controller = require("../controllers/product");
const { uploadProductImages } = require("../middlewares/upload");

router.post("/", uploadProductImages, controller.create);
router.get("/", controller.getAll);

module.exports = router;
