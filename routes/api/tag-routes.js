const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{model: Product, through: ProductTag}],
    },
  );
    if(tags.length === 0) {
      res.status(404).json("No tags found");
      return;
    }
    res.status(200).json(tags);
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}]
    });
    if(!tag) {
      res.status(404).json("No tag found");
      return;
    }
    res.status(200).json(tag)
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    if (req.body.productIds) {
      const productIds = req.body.productIds.map(product_id => {
        return {
          tag_id: tag.id,
          product_id
        }
      });
      await ProductTag.bulkCreate(productIds);
      res.status(201).json(productIds);
      return;
    }
    res.status(201).json(tag);
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (req.body.productIds) {
      const productTags = await ProductTag.findAll({
        where: {
          tag_id: req.params.id
        }
      });
      const productTagIds = productTags.map(({product_id}) => product_id);
      const newProductTags = req.body.productIds
      .filter(product_id => !productTagIds.includes(product_id))
      .map(product_id => {
        return {
            tag_id: req.params.id,
            product_id
          }
      });
      
      const productTagsToRemove = productTags
          .filter(({ product_id }) => !req.body.productIds.includes(product_id))
          .map(({ id }) => id);
      await ProductTag.destroy({
        where: {
          id: productTagsToRemove,
        }
      });
      await ProductTag.bulkCreate(newProductTags);
      res.status(201).json(newProductTags);
      return;
    }
res.status(201).json(tag);
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!tag) {
      res.status(404).json("No tag with this id");
      return;
    }
    res.status(200).json("Tag deleted");
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
