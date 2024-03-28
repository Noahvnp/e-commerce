const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const sendMail = require("../utils/sendMail");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      success: false,
      mes: "Thiếu dữ liệu đầu vào",
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("Tài khoản đã tồn tại");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? 0 : 1,
      mes: newUser
        ? "Tạo tài khoản thành công! Hãy đăng nhập để tiếp tục."
        : "Có lỗi xảy ra!",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Thiếu dữ liệu đầu vào",
    });

  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...userData } = response.toObject(); //plain object
    const accessToken = generateAccessToken(response._id, role);
    const newRefreshToken = generateRefreshToken(response._id);
    //Lưu refreshToken vào db
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    //Lưu refreshToken vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    });
  } else throw new Error("Đăng nhập thất bại!");
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id }).select(
    "-refreshToken -password -role"
  );

  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !req.refreshToken)
    throw new Error("Không tìm thấy refresh token trong cookie");

  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });

  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token không hợp lệ",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("Không tìm thấy refresh token trong cookie");

  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    mes: "Đăng xuất thành công!",
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Không tìm thấy email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("Tài khoản không tồn tại");

  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.
  Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

  const data = {
    email,
    html,
  };

  const result = await sendMail(data);
  return res.status(200).json({
    success: result ? true : false,
    result,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Thiếu dữ liệu đầu vào");

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Reset token không hợp lệ");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();

  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Thay đổi mật khẩu thành công!" : "Có lỗi xảy ra",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Thiếu dữ liệu đầu vào");

  const response = await User.findByIdAndDelete(_id);

  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response
      ? `Đã xóa người dùng với tài khoản ${response.email}`
      : "Không có tài khoản nào vừa xóa",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Thiếu dữ liệu đầu vào");

  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role");

  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ?? "Có lỗi xảy ra",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (!uid || Object.keys(req.body).length === 0)
    throw new Error("Thiếu dữ liệu đầu vào");

  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role");

  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ?? "Có lỗi xảy ra",
  });
});

const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Thiếu dữ liệu đầu vào");

  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ?? "Có lỗi xảy ra",
  });
});

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Thiếu dữ liệu đầu vào");

  const user = await User.findById(_id).select("cart");
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid
  );

  if (alreadyProduct) {
    if (alreadyProduct?.color === color) {
      const response = await User.updateOne(
        {
          cart: { $elemMatch: alreadyProduct },
        },
        {
          $set: {
            "cart.$.quantity": quantity,
          },
        },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updateUser: response ?? "Có lỗi xảy ra",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        {
          $push: { cart: { product: pid, quantity, color } },
        },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updateUser: response ?? "Có lỗi xảy ra",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: { cart: { product: pid, quantity, color } },
      },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      updateUser: response ?? "Có lỗi xảy ra",
    });
  }
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserAddress,
  updateUserByAdmin,
  updateCart,
};
