const express = require("express");
const router = express.Router();
const controller = require("./../controllers/category");
const { uploadCategoryImage } = require("../middlewares/upload");

router.post("/", uploadCategoryImage, controller.create);
router.get("/", controller.getAll);
router.delete("/:id", controller.delete);

module.exports = router;
