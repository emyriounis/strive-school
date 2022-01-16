import Product from "./product.js";
import Review from "./review.js";
import User from "./user.js";
import Category from "./category.js";
import ProductCategory from "./productCategory.js";

Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Product.belongsToMany(Category, {
  through: ProductCategory,
  onDelete: "CASCADE",
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  onDelete: "CASCADE",
});

export { Product, Review, User, Category, ProductCategory };
