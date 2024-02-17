"use strict";

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json("API 1.0.0");
});

const apiRouter = require("./routes/routes");
app.use("/api", apiRouter.routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
