/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.cookies);
    console.log(req.cookies.token);
    const token = req.cookies.token.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;
    console.log(token);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'unauthorized', stack: error.stack });
  }
};
