const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || "3001";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const LOCAL_DB = "mongodb://127.0.0.1:27017/toDoList";
mongoose.connect(process.env.MONGODB_URL || LOCAL_DB, {
  useNewUrlParser: true,
});

const dataRouter = require("./routes/dataRoutes");
app.use("/api", dataRouter);

mongoose.connection.once("open", function () {
  console.log("Connected to the Database.");
});
mongoose.connection.on("error", function (error) {
  console.log("Mongoose Connection Error : " + error);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
