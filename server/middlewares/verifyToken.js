const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          mes: "Token không hợp lệ",
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: "Token không hợp lệ",
    });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "admin")
    return res.status(401).json({
      success: false,
      mes: "Bạn không có quyền truy cập",
    });
  next();
});

module.exports = {
  verifyAccessToken,
  isAdmin,
};
