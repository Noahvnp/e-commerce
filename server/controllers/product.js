const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0)
    throw new Error("Thiếu dữ liệu đầu vào");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  return res.status(200).json({
    success: product ? true : false,
    createProduct: product ?? "Không thể thêm sản phẩm mới",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!pid) throw new Error("Thiếu dữ liệu đầu vào");
  const product = await Product.findById(pid);
  res.status(200).json({
    success: product ? true : false,
    productData: product ?? "Không thể tìm thấy sản phẩm",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // format operater cho đúng với mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  //Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queriesCommand = Product.find(formatedQueries);

  //Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queriesCommand = queriesCommand.sort(sortBy);
  }

  //Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queriesCommand = queriesCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queriesCommand.skip(skip).limit(limit);

  queriesCommand
    .then(async (response) => {
      const counts = await Product.find(formatedQueries).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        products: response ?? "Không thể tìm thấy sản phẩm",
      });
    })
    .catch((err) => console.log(err));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ?? "Không thể cập nhật sản phẩm",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ?? "Không thể xóa sản phẩm",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
