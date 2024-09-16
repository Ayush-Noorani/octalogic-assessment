const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());

const start = () => {
  try {
    app.listen(port, console.log("Listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
