const mongoose = require("mongoose");

const databaseConnection = () => {
  mongoose.connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    console.log("Db connected sucessfully");
  } catch (err) {
    console.log(err);
  }
};

module.exports = databaseConnection;
