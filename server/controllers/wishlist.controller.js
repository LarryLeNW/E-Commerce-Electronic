const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const updateWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity = 1, color, price, thumb, title } = req.body;
  if (!(pid && quantity && color && thumb && title)) {
    throw new Error("Missing inputs");
  }

  const user = await User.findById(_id).select("cart");

  if (!user) {
    throw new Error("User not found");
  }

  let listCart = user.cart;

  const exitProductIndex = listCart.findIndex(
    (el) => el.product.toString() === pid
  );

  if (exitProductIndex !== -1) {
    if (listCart[exitProductIndex].color === color) {
      listCart[exitProductIndex].quantity = quantity;
    } else {
      listCart.push({ product: pid, quantity, color, price, thumb, title });
    }
  } else {
    listCart.push({ product: pid, quantity, color, price, thumb, title });
  }

  const updatedUserCart = await User.findByIdAndUpdate(
    _id,
    { cart: listCart },
    { new: true }
  );

  return res.status(200).json({
    success: !!updatedUserCart,
    message: updatedUserCart
      ? "Cart updated successfully"
      : "Something went wrong",
    listCart: updatedUserCart.cart,
  });
});

const removeItemCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid } = req.params;
  if (!pid) throw new Error("Missing inputs ");

  const response = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { cart: { product: pid } },
    },
    { new: true }
  );

  return res.status(200).json({
    success: !!response,
    message: response
      ? "remove this item successfully"
      : "Some thing went wrong",
    data: response,
  });
});

module.exports = {
  updateCart,
  removeItemCart,
};
