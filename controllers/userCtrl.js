const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      //Check exist email
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      //hash password
      const passwordHash = await bcrypt.hash(password, 10);
      //create new user
      const newUser = new Users({
        username,
        email,
        password: passwordHash,
      });
      //save
      await newUser.save();
      //All good
      res.json({ msg: "Sign up Success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      //not exist user
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      //if login success create token
      const payload = { id: user._id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.json({ token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifiedToken: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) => {
        if (err) return res.send(false);

        const user = await Users.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
