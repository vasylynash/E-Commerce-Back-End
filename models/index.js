const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require('./ProductTag');

Product.belongsTo(Category);

Category.hasMany(Product, {
  foreignKey: "category_id",
});

Product.belongsToMany(Tag, {
  through: "product_tag",
  unique: false,
  onDelete: 'CASCADE',
});

Tag.belongsToMany(Product, {
  through: "product_tag",
  unique: false,
  onDelete: 'CASCADE',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
