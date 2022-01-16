import sequelize from "../index.js";

const ProductCategory = sequelize.define(
  "productCategory",
  {},
  {
    timestamps: false,
  }
);

export default ProductCategory;
