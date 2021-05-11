module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    SkuId: {
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
    Images: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
