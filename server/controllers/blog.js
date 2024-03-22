const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category)
    throw new Error("Thiếu dữ liệu đầu vào");

  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ?? "Không thể tạo bài viết mới",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0)
    throw new Error("Thiếu dữ liệu đầu vào");

  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ?? "Không thể cập nhật bài viết",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    getBlogs: response ?? "Không thể hiển thị bài viết",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Thiếu dữ liệu đầu vào");

  const blog = await Blog.findById(bid);

  const alreadyDisLikedBlog = blog?.disLikes?.find(
    (el) => el.toString() === _id
  );
  if (alreadyDisLikedBlog) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }

  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Thiếu dữ liệu đầu vào");

  const blog = await Blog.findById(bid);

  const alreadyLikedBlog = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLikedBlog) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }

  const isDisLiked = blog?.disLikes?.find((el) => el.toString() === _id);
  if (isDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { disLikes: _id } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      rs: response,
    });
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", "firstname lastname")
    .populate("disLikes", "firstname lastname");
  return res.status(200).json({
    success: blog ? true : false,
    result: blog ?? "Không thể hiển thị bài viết",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!bid) throw new Error("Thiếu dữ liệu đầu vào");

  const response = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    deletedBlog: response ?? "Không thể xóa bài viết",
  });
});

const uploadImageBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Thiếu dữ liệu đầu vào");

  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ?? "Không thể thêm hình ảnh",
  });
});
module.exports = {
  createNewBlog,
  updateBlog,
  getBlogs,
  likeBlog,
  disLikeBlog,
  getBlog,
  deleteBlog,
  uploadImageBlog,
};
