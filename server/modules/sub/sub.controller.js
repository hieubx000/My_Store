const Sub = require("./sub");
const Product = require("../product/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent, image } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name), image }).save();
    res.json(sub);
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create SubCategory failed");
  }
};

exports.list = async (req, res) => res.json(await Sub.find({}).populate("parent", "_id name").sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub }).populate("category").exec();

  res.json({
    sub,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent, image } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate({ slug: req.params.slug }, { name, parent, slug: slugify(name), image }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).send("SubCategory update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("SubCategory delete failed");
  }
};
