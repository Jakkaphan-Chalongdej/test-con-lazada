const db = require("../model");
const Product = db.product;

exports.create = (req, res) => {
  let filename = null;
  if (typeof req.file != "undefined") {
    filename = "/resources/uploads/" + req.file.filename;
    Product.create({
      SkuId: req.body.SkuId,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      Images: filename,
      description: req.body.description,
      category: req.body.category,
    })
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
        res.json({ err: "Create Failed" });
      });
  } else {
    Product.create({
      SkuId: req.body.SkuId,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category,
    })
      .then((products) => {
        res.send(products);
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
        SkuId: req.body.SkuId,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        Images: filename,
        description: req.body.description,
        category: req.body.category,
      },
      { where: { id: id } }
    )
      .then((products) => {
        // res.json({ msg: "Update successfully!", file: req.file });
        res.send(products);
      })
      .catch((err) => {
        res.status(500).send("Error -> " + err);
        res.json({ err: "Update Failed" });
      });
  } else {
    Product.update(
      {
        SkuId: req.body.SkuId,
        name: req.body.name,
        Images: req.body.img_name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        category: req.body.category,
      },
      { where: { id: id } }
    )
      .then((products) => {
        // res.json({ msg: "Update successfully!", file: req.file });
        res.send({
          // id: id,
          SkuId: req.body.SkuId,
          name: req.body.name,
          img_name: req.body.img_name,
          price: req.body.price,
          quantity: req.body.quantity,
          description: req.body.description,
          category: req.body.category,
        });
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
