const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const {connectDB} = require("./models/db")



//Connect to database, comment out if using memory
//connectDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const dataRouter = require("./routes/dataRoutes");
app.use("/api", dataRouter);


//if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
//}

module.exports = app;
