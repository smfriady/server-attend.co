if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const PORT = process.env.PORT || 4001;

const app = express();

const { errorHandler } = require("./middlewares/errorHandler");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

// app.listen(PORT, (_) => console.log(`Serverup at port ${PORT}`));

module.exports = app;
