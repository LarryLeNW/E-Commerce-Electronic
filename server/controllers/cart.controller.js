const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");

const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity = 1, color } = req.body;
  if (!pid || !quantity) {
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
      listCart.push({ product: pid, quantity, color });
    }
  } else {
    listCart.push({ product: pid, quantity, color });
  }

  const updatedUserCart = await User.findByIdAndUpdate(
    _id,
    { cart: listCart },
    { new: true }
  ).populate("cart.product", "title thumb price ");

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
  const user = await User.findById(_id).select("cart");
  const exitProduct = user?.cart?.find((el) => el.product.toString() === pid);
  if (!exitProduct)
    return res.status(400).json({
      success: false,
      message: "This item not exits in your cart",
    });

  const response = await User.findByIdAndUpdate(
    _id,
    {
      $pull: { cart: { product: pid } },
    },
    { new: true }
  ).populate("cart.product", "title thumb price ");

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
