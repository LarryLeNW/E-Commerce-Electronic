const mongoose = require("mongoose");

var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    numberViews: {
      type: Number,
      default: 0,
    },
    interactions: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        type: {
          type: String,
          enum: ["like", "dislike"],
        },
      },
    ],
    totalReaction: {
      type: Number,
      default: 0,
    },
    thumb: {
      type: String,
      default: "https://wallpapercave.com/dwp1x/wp7348236.jpg",
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Blog", blogSchema);
