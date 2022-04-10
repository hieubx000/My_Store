const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    desc: {
      type: String,
      required: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      default: "Yes",
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
    },
    wishlist: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    // ratings: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
