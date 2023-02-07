const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

require("../db/conn");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello world from server router.js");
});

//using promisses

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "plz fill the field properly" });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email alredy exist" });
//       }
//       const user = new User({
//         name: name,
//         email: email,
//         phone: phone,
//         work: work,
//         password: password,
//         cpassword: cpassword,
//       });
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed to registerd" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email alredy exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        work: work,
        password: password,
        cpassword: cpassword,
      });

      await user.save();

      // console.log(`${user} user registerd succesfully`)
      // console.log(userRegister)

      res.status(201).json({ message: "user registered successfully" });

      // if (userRegister) {
      //   res.status(201).json({ message: "user registered successfully" });
      // }
    }
  } catch (err) {
    console.log(err);
  }
});

//login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "please fill the data again" });
    }

    const userLogin = await User.findOne({ email: email });

    //console.log(userLogin);

    const isMatch = await bcrypt.compare(password, userLogin.password);

    const token = await userLogin.generateAuthToken();

    console.log(token);

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),

      httpOnly: true,
    });

    if (!isMatch) {
      res.json({ message: "Invalid credentials" });
    } else {
      res.json({ message: "signed in successfully" });
    }
  } catch (error) {}
});

module.exports = router;
