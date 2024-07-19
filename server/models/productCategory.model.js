const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    thumb: {
      required: true,
      type: String,
    },
    brands: {
      type: Array,
      required: true,
    },
    totalProduct: {
      type: Number,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("ProductCategory", productCategorySchema);
