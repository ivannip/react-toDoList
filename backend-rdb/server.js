const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const PORT = process.env.PORT || "3001";

const db = require("./models/db");

db.sequelize.sync();
// db.sequelize.sync({force: true}, () => {
//     console.log("Drop and re-sync database")
// });

const dbRouter = require("./routes/dbRoutes");
app.use("/api", dbRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
    });
  }

app.listen(PORT, () => {
    console.log(`Server listen on ${PORT}`)
})