const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const checkCors = require('./api/middlewares/checkCors');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/cpt', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('connected'))
  .catch(error => console.log(error));

const userRoutes = require('./api/routes/userRoutes');
const portfolioRoutes = require('./api/routes/portfolioRoutes');
const favCoinsRoutes = require('./api/routes/favCoinsRoutes');
const coinApiRoutes = require('./api/routes/coinApiRoutes');
const icoRoutes = require('./api/routes/icoRoutes');
const chartRoutes = require('./api/routes/chartRoutes');
const adminPanelRoutes = require('./api/routes/adminPanelRoutes');

app
  .use(helmet())
  .use(compression())
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(checkCors)
  .use('/uploads', express.static('uploads'));

app
  .options('/api/user', checkCors)
  .options('/api/portfolio', checkCors)
  .options('/api/favCoins', checkCors)
  .options('/api/coins', checkCors)
  .options('/api/icos', checkCors)
  .options('/api/charts', checkCors)
  .options('/api/adminPanel', checkCors);

app
  .use('/api/user', userRoutes)
  .use('/api/portfolio', portfolioRoutes)
  .use('/api/favCoins', favCoinsRoutes)
  .use('/api/coins', coinApiRoutes)
  .use('/api/icos', icoRoutes)
  .use('/api/charts', chartRoutes)
  .use('/api/adminPanel', adminPanelRoutes);

// error handler
app.use((req, res, next) => {
  const error = new Error('Route Not Found');
  error.status = 404;
  next(error);
});

// development error handler
// will print stracktrace
if (app.get('env') === 'development') {
  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message, error } });
  });
}

// production error handler
// no stacktraces
if (app.get('env') === 'production') {
  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({ error: {} });
  });
}

module.exports = app;
