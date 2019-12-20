const bcrypt = require('bcrypt');

/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const User = require('../models/userModels').user;
const Feedback = require('../models/userModels').feedback;

exports.signup = async (req, res) => {
  try {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ error: 'email already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, fname, lname, password: hashPassword });
    await newUser.save();
    return res.status(201).json({ msg: `Welcome ${fname} ${lname}` });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.signin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const signedToken = await jwt.sign(
        {
          id: user._id,
          email: user.email,
          fname: user.fname,
          lname: user.lname
        },
        'secret'
      );
      console.log(user);
      return res
        .status(200)
        .cookie('token', `JWT ${signedToken}`, {
          maxAge: 365 * 60 * 60 * 24,
          httpOnly: true
        })
        .json({ msg: 'ok' });
    }

    throw new Error('unauthorized');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.profilePic = async (req, res) => {
  try {
    const updateProfilePic = await User.findByIdAndUpdate(
      { _id: req.userData.id },
      { profilePic: `http://localhost:3000/${req.file.path}` },
      { new: true }
    );
    return res.status(200).json({ updateProfilePic });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getProfile = (req, res) => {
  User.findById(req.userData.id)
    .select({ password: 0, __v: 0 })
    .then(data => {
      return res.status(200).json({ userProfile: data });
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};

exports.feedback = async (req, res) => {
  try {
    const email = req.userData.email;
    const feedback = req.body.feedback;
    const newFeedback = new Feedback({ email, feedback });
    await newFeedback.save();
    return res.status(200).json({ msg: 'feedback submitted' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.allFeedbacks = async (req, res) => {
  Feedback.find()
    .then(data => {
      return res.status(200).json({ data });
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
};
