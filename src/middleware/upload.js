const multer = require("multer");
const typeimage = (file) => {
  if (file.mimetype === "image/jpeg") {
    return "jpg";
  } else if (file.mimetype === "image/jpg") {
    return "jpg";
  }
};
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${typeimage(file)}`);
  },
});

var upload = multer({ storage: storage });

module.exports = upload;
