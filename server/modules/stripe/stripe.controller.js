const User = require("../user/user");
const Cart = require("../user/cart");
const Product = require("../product/product");
const Coupon = require("../coupon/coupon");
const stripe = require("stripe")(process.env.STRIPE_SECRET || "sk_test_");

exports.createPaymentIntent = async (req, res) => {
  // console.log(req.body);
  const { couponApplied } = req.body;

  // 1 find user
  const user = await User.findOne({ email: req.user.email }).exec();
  // 2 get user cart total
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();
  console.log("CART TOTAL", cartTotal, "AFTER DIS%", totalAfterDiscount);

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  // create payment intent with order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
