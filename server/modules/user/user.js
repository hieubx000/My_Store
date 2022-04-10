const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema(
  {
    name: String,
    picture: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    area: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "Hanoi, Vietnam",
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
