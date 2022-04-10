const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../auth/auth.validation");
// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("./user.controller");

router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);
router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder); // cod
router.get("/user/orders", authCheck, orders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;
