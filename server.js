const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bb = require("express-busboy");
const path = require("path");

// import routes
const todoRoutes = require("./routes/todo.server.route");
// define our app using express
const app = express();
// express-busboy to parse multipart/form-data
bb.extend(app);
// allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// configure app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//set the port
const port = process.env.PORT || 3001;
// connect to database
const db = require("./config/key").MongoURI;
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("mongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  return res.end("Api working");
});
// catch 404
app.use((req, res, next) => {
  res.status(404).send("<h2 align=center>Page Not Found!</h2>");
});
// start the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
