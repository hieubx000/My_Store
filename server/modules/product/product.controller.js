const Product = require("./product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.name);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    // console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.limit))
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate("category", "_id name").populate("subs", "_id name").exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product delete failed");
  }
};

// WITHOUT PAGINATION
// exports.list = async (req, res) => {
//   try {
//     // createdAt/updatedAt, desc/asc, 4
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// WITH PAGINATION
exports.list = async (req, res) => {
  // console.table(req.body);
  try {
    // createdAt/updatedAt, desc/asc, 4
    const { sort, order, page, perPage } = req.body;
    const currentPage = page || 1;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(related);
};

// SEARCH / FILTER

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();
  // console.log(products);
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category }).populate("category", "_id name").populate("subs", "_id name").exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleSub = async (req, res, sub) => {
  const products = await Product.find({ subs: sub }).populate("category", "_id name").populate("subs", "_id name").exec();
  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color }).populate("category", "_id name").populate("subs", "_id name").exec();
  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand }).populate("category", "_id name").populate("subs", "_id name").exec();
  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, sub, color, brand } = req.body;

  if (query) {
    console.log("query --->", query);
    await handleQuery(req, res, query);
  }
  // price [20, 200]
  if (price !== undefined) {
    console.log("price ---> ", price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log("category ---> ", category);
    await handleCategory(req, res, category);
  }

  if (sub) {
    console.log("sub ---> ", sub);
    await handleSub(req, res, sub);
  }

  if (color) {
    console.log("color ---> ", color);
    await handleColor(req, res, color);
  }

  if (brand) {
    console.log("brand ---> ", brand);
    await handleBrand(req, res, brand);
  }
};
