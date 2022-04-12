import Stripe from "stripe";

import Order from "../models/order.model";
import User from "../models/user.model";

const stripe = Stripe(
  "sk_test_51KIBUjHpX6LnEMrKajNWq4qUZo6dUhC6BvLthlUPho89LocPrFkVm1vIXZffFbVAC948JNTc4oNR8QkKa0OyCe7L00spiUkQ97"
);

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    return next(error);
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(item => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `${process.env.DOMAIN}/orders/success`,
    cancel_url: `${process.env.DOMAIN}/orders/failure`,
  });

  res.redirect(303, session.url);
};

const getSuccess = (req, res) => {
  res.render("customer/orders/success");
};

const getFailure = (req, res) => {
  res.render("customer/orders/failure");
};

export default {
  addOrder,
  getOrders,
  getSuccess,
  getFailure,
};
