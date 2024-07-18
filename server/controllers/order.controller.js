const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Counpon = require("../models/coupon.model");

const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.mode,
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
});

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { numberPhone, address, typePayment, products, total } = req.body;
  if (!(address && numberPhone && typePayment && products && total))
    throw new Error("Missing input");

  if (typePayment == "Direct") {
    const response = await Order.create({
      ...req.body,
      orderBy: _id,
      code: `HD-${Math.floor(Math.random() * 10000)}${_id.slice(-2)}`,
    });

    return res.json({
      success: response ? true : false,
      data: response || "Can't create new order",
    });
  } else {
    handPaymentBanking(req, res);
  }
});

const handPaymentBanking = (req, res) => {
  const { address, numberPhone, note, products } = req.body;
  let items = products.map((el) => {
    return {
      name: el.title,
      price: el.price / 25000,
      currency: "USD",
      quantity: el.quantity,
    };
  });

  console.log("🚀 ~ handPaymentPaypal ~ products:", products);

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
      payer_id: req?._id,
    },
    redirect_urls: {
      return_url: `${process.env.URL_SERVER}/api/payment/success`,
      cancel_url: `${process.env.URL_SERVER}/api/payment/cancel`,
    },
    transactions: [
      {
        item_list: {
          items,
        },
        amount: {
          currency: "USD",
          total: req.body?.total / 25000,
        },
        description: JSON.stringify({ address, numberPhone, note }),
      },
    ],
  };

  paypal.payment.create(
    JSON.stringify(create_payment_json),
    function (error, payment) {
      if (error) {
        console.log("🚀 ~ error:", error);
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.send(payment.links[i].href);
          }
        }
      }
    }
  );
};

const updateStatusOrder = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");

  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );

  return res.json({
    success: response ? true : false,
    updatedOrder: response || "Can't change status order",
  });
});

const getOrdersUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id }).select(
    "-products -typePayment -note "
  );

  return res.json({
    success: response ? true : false,
    data: response || "Can't get order",
  });
});

const getOrderUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { oid } = req.params;
  const response = await Order.findOne({ _id: oid, orderBy: _id });
  console.log("🚀 ~ getOrderUser ~ response:", response);
  return res.json({
    success: response ? true : false,
    data: response || "Can't get order",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.json({
    success: response ? true : false,
    data: response || "Can't get orders",
  });
});

module.exports = {
  createOrder,
  updateStatusOrder,
  getOrdersUser,
  getOrders,
  getOrderUser,
};
