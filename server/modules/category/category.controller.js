const Category = require("./category");
const Product = require("../product/product");
const Sub = require("../sub/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, image } = req.body;
    const category = await new Category({ name, slug: slugify(name), image }).save();
    res.json(category);
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => res.json(await Category.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();
  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, image } = req.body;
  try {
    const updated = await Category.findOneAndUpdate({ slug: req.params.slug }, { name, slug: slugify(name), image }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};
