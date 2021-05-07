const db = require("../model");
const Product = db.product;

exports.create = (req, res) => {
  let filename = null;
  if (typeof req.file != "undefined") {
    filename = "/resources/uploads/" + req.file.filename;
    Product.create({
      skuID: req.body.skuID,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      img_name: filename,
      des: req.body.des,
      discount_price: req.body.discount_price,
      category: req.body.category,
    })
      .then(() => {
        res.json({ msg: "create successfully!", file: req.file });
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
        res.json({ err: "Create Failed" });
      });
  } else {
    Product.create({
      skuID: req.body.skuID,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      des: req.body.des,
      discount_price: req.body.discount_price,
      category: req.body.category,
    })
      .then(() => {
        res.json({ msg: "create successfully!" });
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
        res.json({ err: "Create Failed" });
      });
  }
};

// Find all products
exports.findAll = (req, res) => {
  Product.findAll({
    order: [["id", "DESC"]],
  }).then((products) => {
    res.send(products);
  });
};

// Find a products by Id
exports.findById = (req, res) => {
  const id = req.params.productId;
  Product.findByPk(id).then((product) => {
    res.status(200).send(product);
  });
};

// Update products
exports.update = (req, res) => {
 
  const id = req.params.productId;
  if (typeof req.file !== "undefined") {
    let filename = null;
    filename = "/resources/uploads/" + req.file.filename;
    Product.update(
      {
        skuID: req.body.skuID,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        img_name: filename,
        des: req.body.des,
        discount_price: req.body.discount_price,
        category: req.body.category,
      },
      { where: { id: id } }
    )
      .then(() => {
        res.json({ msg: "Update successfully!", file: req.file });
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
        res.json({ err: "Update Failed" });
      });
  } else {
    Product.update(
      {
        skuID: req.body.skuID,
        name: req.body.name,
        img_name: req.body.img_name,
        price: req.body.price,
        quantity: req.body.quantity,
        des: req.body.des,
        discount_price: req.body.discount_price,
        category: req.body.category,
      },
      { where: { id: id } }
    )
      .then(() => {
        res.json({ msg: "Update successfully!", file: req.file });
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
        res.json({ err: "Update Failed" });
      });
  }
};

// Delete a products by Id
exports.delete = (req, res) => {
  const id = req.params.productId;
  Product.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Deleted successfullyid = " + id);
    })
    .catch((err) => {
      res.status(500).send("Error -> " + err);
      res.json({ err: "Deleted Failed" });
    });
};
return false;
