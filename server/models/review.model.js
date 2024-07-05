const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var reviewSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    star: { type: Number },
    comment: { type: String },
    images: {
      type: Array,
    },
    productId: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Review", reviewSchema);
