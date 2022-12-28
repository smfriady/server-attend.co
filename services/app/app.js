if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { errorHandler } = require("./middlewares");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 4001;

const indexRouter = require("./routes");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(indexRouter);
app.use(errorHandler);

app.listen(PORT, (_) => console.log(`Serverup at port ${PORT}`));
