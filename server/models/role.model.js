const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var roleSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Role", roleSchema);
