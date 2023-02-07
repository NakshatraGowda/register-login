const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connected to mongodb", err));

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("MongoDB connection established."))
//   .catch((error) => console.error("MongoDB connection failed:", error.message));
