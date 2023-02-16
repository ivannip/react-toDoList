const app = require("./app");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT || "3001";

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});
