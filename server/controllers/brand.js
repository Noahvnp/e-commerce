const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBrand: response ?? "Không thể thêm Brand mới",
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.status(200).json({
    success: response ? true : false,
    gotBrands: response ?? "Không thể hiển thị Brand",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedBrand: response ?? "Không thể cập nhật Brand",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    deletedBrand: response ?? "Không thể xóa Brand",
  });
});

module.exports = {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
