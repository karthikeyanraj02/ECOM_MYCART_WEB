const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const Cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "config/.env") }); // what we do dirname is  [../Ecom/backend]
app.use(express.json()); // it can accept all request data
app.use(cookieParser());

app.use(
  Cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

const productsRouter = require("../backend/router/products");
const userRouter = require("../backend/router/userRegister");
const orderRouter = require("../backend/router/order");
const paymentRouter = require("../backend/router/payment");

app.use("/api", productsRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", paymentRouter);

// this is to change the frontend port to backend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  // below line is get request from frontend
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorMiddleware);
module.exports = app;
