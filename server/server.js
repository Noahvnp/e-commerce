const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

dbConnect();
initRoutes(app);

app.use("/", (req, res) => {
  res.send("SERVER ON");
});
app.listen(port, () => console.log("Server running on port " + port));
