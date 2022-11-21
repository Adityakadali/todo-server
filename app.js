require("dotenv").config();
const express = require("express");
const { router } = require("./routes/todoRoutes");

require("./config/database").connectDB(); //Connecting Database

const app = express();

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server started successfully on port:", process.env.PORT);
});
