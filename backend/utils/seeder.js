const products = require("../datas/product.json");
const Product = require("../models/productModel");
const dotenv = require("dotenv");
const databaseConnection = require("../config/database");

dotenv.config({ path: "backend/config/.env" });
databaseConnection();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted!");
    await Product.insertMany(products);
    console.log("All products added!");
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedProducts();
