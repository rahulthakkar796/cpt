const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true
};

module.exports = cors(corsOptions);
