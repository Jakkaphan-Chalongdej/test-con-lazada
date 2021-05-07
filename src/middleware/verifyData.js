const db = require("../model");
const Product = db.product;

checkDuplicateSkuID = (req, res, next) => {
  const sku = req.body.skuID;
  if (sku) {
    // sku ID
    Product.findOne({
      where: {
        skuID: req.body.skuID,
      },
    }).then((skuid) => {
      if (skuid) {
        res.status(400).send({ message: "Failed! sku ID is already in use!" });
        return;
      }
      next();
    });
  } else {
    next();
  }
};
const verifyData = {
  checkDuplicateSkuID: checkDuplicateSkuID,
};

module.exports = verifyData;
