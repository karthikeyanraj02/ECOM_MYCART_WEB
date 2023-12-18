const app = require("./app");
const databaseConnection = require("./config/database");

databaseConnection(); // database calling

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server connected & runing in ${process.env.PORT} and environment is ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandleRejection");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});
