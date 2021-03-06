const express = require("express");
const app = express();
const itemRouter = express.Router();

let Item = require("../models/Item");

itemRouter.route("/add/post").post(function(req, res) {
  const item = new Item(req.body);
  item
    .save()
    .then(item => {
      res.json("Item added successfully");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//listing route
itemRouter.route("/").get(function(rq, res) {
  Item.find(function(err, itms) {
    if (err) {
      console.log(err);
    } else {
      res.json(itms);
    }
  });
});

//define edit route
itemRouter.route("/edit/:id").get(function(req, res) {
  const id = req.params.id;
  Item.findById(id, function(err, item) {
    res.json(item);
  });
});

// define update route
itemRouter.route("/update/:id").post(function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item) {
      return next(new Error("could not load document"));
    } else {
      item.item = req.body.item;
      item
        .save()
        .then(item => {
          res.json("Update complete");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Define delete | remove| destroy route
itemRouter.route("/delete/:id").get(function(req, res) {
  Item.findByIdAndRemove({ _id: req.params.id }, function(err, item) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = itemRouter;
