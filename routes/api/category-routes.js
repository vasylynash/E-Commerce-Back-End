const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{model: Product}]
    });
    if(categories.length === 0) {
      res.status(404).json("No categories found");
      return;
    } 
    res.status(200).json(categories);
  }
    catch(e) {
      res.status(500).json(e);
    }
  });

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!category) {
      res.status(404).json("No category with this id");
      return;
    }
    res.status(200).json(category);
  }
  catch(e) {
      res.status(500).json(e);
    }
});

router.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    console.log(category);
    if(!category[0]){
      res.status(404).json({message: "No category with this id"});
      return;
    }
    const result = await Category.findByPk(req.params.id);
    res.status(200).json(result);
  }
  catch(e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.update({category_id: null}, {
      where: {
        category_id:req.params.id
      }
    });
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!category) {
      res.status(404).json({message: "No category with this id"})
    }
    
    res.status(200).json({message: "Category deleted"});
  }
  catch(e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
