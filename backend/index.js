const express = require("express");
const app = express();
require("dotenv").config();
const APIroutes = require("./routes/APIroutes");
const cors = require("cors");
require("dotenv").config();
const setupDB = require("./db/makeTables.js");

const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/", APIroutes);

const start = () => {
  try {
    app.listen(port, async () => {
      console.log("Listening on port " + port);
      try {
        await setupDB();
      } catch (e) {
        console.log("Erro when trying to setup database tables", e);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

start();
