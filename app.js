const express = require("express");
const app = express();

require("./config/mongoose.config");

const routes = require("./routes");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static("public"));

app.set("view engine", "joi");
app.set("views", __dirname + "/views");

app.use(routes);
app.use((req, res, next) => {
  next({
    status: 404,
    msg: "not found",
  });
});

app.use((error, req, res, next) => {
  let status = error.status ?? 500;
  let msg = error.msg ?? error;
  res.status(status).json({
    status: false,
    msg: msg
  });
});

app.listen(3000, "localhost", (error) => {
  if (!error) {
    console.log("listening to server...");
  }
});
