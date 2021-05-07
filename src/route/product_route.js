const verifyData = require("../middleware/verifyData");
const product = require("../controller/product.controller");
const upload = require("../middleware/upload");
module.exports = function (server) {
  
  // Create
  server.post(
    "/api/product/create",
    upload.single("uploadfile"),
    verifyData.checkDuplicateSkuID,
    product.create
  );

  // Retrieve all
  server.get("/api/product", product.findAll);

  // Retrieve a singl by Id
  server.get("/api/product/:productId", product.findById);

  // Update by Id
  server.put(
    "/api/product/:productId",
    upload.single("uploadfile"),
    verifyData.checkDuplicateSkuID,
    product.update
  );

  // Delete by Id
  server.delete("/api/product/:productId", product.delete);
};
