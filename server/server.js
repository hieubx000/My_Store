require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
readdirSync("./modules").map((r) => app.use("/api", require("./modules/" + r)));

// port
const port = process.env.PORT || 9090;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
