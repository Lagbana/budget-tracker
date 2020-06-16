const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true,
  useFindAndModify: true,
  userFindAndModify: false,
  useCreateIndex: true
});

// routes
app.use(require("./routes/api.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});