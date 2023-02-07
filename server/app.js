const dotenv = require("dotenv");
const express = require("express");
const { mongoose } = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

dotenv.config({ path: "./config.env" });

require("./db/conn");
// const User = "./model/userSchema";

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT;

const middleware = (req, res, next) => {
  console.log("hello my middleware");
  next();
};

// app.get("/", (req, res) => res.send("Hello World! app.js"));
app.get("/about", middleware, (req, res) => res.send("Hello about World!"));
app.get("/contact", (req, res) => res.send("Hello contact World!"));
app.get("/signup", (req, res) => res.send("Hello Register World!"));
app.get("/signin", (req, res) => res.send("Hello Login World!"));
app.listen(PORT, () =>
  console.log(`Example app listening on port 3000 ${PORT}`)
);
