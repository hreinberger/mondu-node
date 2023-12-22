var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// dotENV
require("dotenv").config();

// standard Express Routes
var indexRouter = require("./routes/index");

// The Routes we're using
var monduConfirmOrderRouter = require("./routes/confirmOrder");
var monduCreateOrderRouter = require("./routes/monduCreateOrder");
var monduCreateInvoiceRouter = require("./routes/monduCreateInvoice");
var checkoutRouter = require("./routes/checkout");
var getordersRouter = require("./routes/orders");
var getorderRouter = require("./routes/order");
var successRouter = require("./routes/success");
var declineRouter = require("./routes/decline");
var orderStatusWebhookRouter = require("./routes/orderStatusWebhook");
var invoiceStatusWebhookRouter = require("./routes/invoiceStatusWebhook");
var getWebhooksRouter = require("./routes/getWebhooks");
var registerWebhookRouter = require("./routes/registerWebhook");
var deleteWebhookRouter = require("./routes/deleteWebhook");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));

// deal with form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/", indexRouter);
app.use("/mondu-confirm-order", monduConfirmOrderRouter);
app.use("/mondu-create-order", monduCreateOrderRouter);
app.use("/mondu-create-invoice", monduCreateInvoiceRouter);
app.use("/checkout", checkoutRouter);
app.use("/orders", getordersRouter);
app.use("/order", getorderRouter);
app.use("/success", successRouter);
app.use("/decline", declineRouter);
app.use("/orderStatus", orderStatusWebhookRouter);
app.use("/invoiceStatus", invoiceStatusWebhookRouter);
app.use("/webhooks", getWebhooksRouter);
app.use("/register-webhook", registerWebhookRouter);
app.use("/delete-webhook", deleteWebhookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
