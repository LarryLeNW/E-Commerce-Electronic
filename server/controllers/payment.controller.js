const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: process.env.mode,
  client_id: process.env.client_id,
  client_secret: process.env.client_secret,
});

const payProduct = async (req, res) => {
  const { _id } = req.user;
  console.log("🚀 ~ payProduct ~ _id:", _id);
  console.log("req.body ", req.body);

  try {
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
        payer_info: {
          first_name: "lebatrinh",
          shipping_address: {
            line1: "tam mỹ đông",
          },
        },
      },
      redirect_urls: {
        return_url: `${process.env.URL_SERVER}/api/payment/success`,
        cancel_url: `${process.env.URL_SERVER}/api/payment/cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "name",
                sku: "123123",
                price: 213213,
                currency: "USD",
                quantity: "1",
              },
            ],
          },
          amount: {
            currency: "USD",
            total: 213213,
          },
          description: "something",
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
  } catch (error) {
    console.log(error.message);
  }
};

const successPage = async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
      payer_id: payerId,
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          try {
            console.log("🚀 ~ payment:", payment);
            // await OrderService.createOrder({
            //   UserID: userInfo.id,
            //   ProductID: product.id,
            //   Cost: total,
            //   Currency: "USD",
            // });
            // return res.redirect(
            //   `${process.env.IP_CLIENT}/profile/order-history`
            // );
            console.log("🚀 ~ payment:", payment);
          } catch (error) {
            return res.redirect(`${process.env.IP_CLIENT}`);
          }
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const cancelPage = async (req, res) => {
  console.log("vào page cancel");
  try {
    res.redirect(process.env.URL_CLIENT);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  payProduct,
  successPage,
  cancelPage,
};
