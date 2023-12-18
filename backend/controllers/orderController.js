const orderSchm = require("../models/orderModel");
const asyncError = require("../middlewares/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");

//Create New order -------  http://localhost:3050/api/order/new

exports.newOrder = asyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await orderSchm.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// get single order  ---------------  http://localhost:3050/api/order/:id

exports.getSingleOrder = asyncError(async (req, res, next) => {
  const order = await orderSchm
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return next(
      new errorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get Loggedin user order

exports.myOrders = asyncError(async (req, res, next) => {
  const orders = await orderSchm.find({
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Admin get all order  ------------  http://localhost:3050/api/allorders/admin
exports.adminGetAllOrders = asyncError(async (req, res, next) => {
  const orders = await orderSchm.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount = totalAmount + order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Admin  order status -----------http://localhost:3050/api/order/admin/:id

exports.updateOrderStatus = asyncError(async (req, res, next) => {
  const order = await orderSchm.findById(req.params.id);

  if (!req.body.orderStatus) {
    return next(new errorHandler("Order status is required.", 400));
  }

  if (order.orderStatus === "Delivered") {
    return next(new errorHandler("Order has been already delivered!", 400));
  }

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({
    success: true,
  });

  // Updating the product stock of each order item
  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}

// admin : delete order -----------

exports.deleteOrder = asyncError(async (req, res, next) => {
  const orders = await orderSchm.findById(req.params.id);

  if (!orders) {
    return next(
      new errorHandler(`order not found with this id ${req.params.id}`)
    );
  }

  await orders.remove();
  res.status(200).json({
    success: true,
    message: "sucessfully order deleted",
  });
});
