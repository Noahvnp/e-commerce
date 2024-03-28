const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// router.get("/", ctrls.getBrands);
router.post("/", verifyAccessToken, ctrls.createOrder);
// router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBrand);
// router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
