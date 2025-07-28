const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";
    if (file.fieldname === "image") folder += "categories/";
    else if (file.fieldname === "images") folder += "products/";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.uploadCategoryImage = multer({ storage }).single("image");
exports.uploadProductImages = multer({ storage }).array("images", 5);
