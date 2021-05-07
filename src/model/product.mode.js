module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    skuID: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    img_name: {
      type: Sequelize.STRING,
    },
    des: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
