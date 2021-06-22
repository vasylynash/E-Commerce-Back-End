const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{model: Category}, {model: Tag, through: ProductTag}]
    });
    if(products.length === 0) {
      res.status(404).json("No products found");
      return;
    }
    res.status(200).json(products);
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include:[{model: Category}, {model: Tag, through: ProductTag}]
    });
    if(!product) {
      res.status(404).json("No product found");
      return;
    }
    res.status(200).json(product);
  }
  catch(e) {
    res.status(500).json(e);
  }
});

router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!product) {
      res.status(404).json("No product with this id");
      return;
    }
    res.status(200).json("Product deleted");
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
