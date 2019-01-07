const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 4200;

const db = require("./config/key").MongoURI;
// use bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// import itemsrouter and use
const itemRouter = require("./routes/itemRouter");
app.use("/items", itemRouter);
app.listen(port, () => console.log(`app listening on port ${port}`));
