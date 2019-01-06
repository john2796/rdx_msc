import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
import bb from "express-busboy";
import path from "path";

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
