const express = require("express");
const app = express();
require("dotenv").config();
const APIroutes = require("./routes/APIroutes");
const cors = require("cors");
require("dotenv").config();

const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/", APIroutes);

const start = () => {
  try {
    app.listen(port, console.log("Listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
