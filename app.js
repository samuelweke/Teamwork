const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');

dotenv.config();

//  Routes
const userRoutes = require('./routes/employee');
const gifRoutes = require('./routes/gif');
const articleRoutes = require('./routes/article');
const feedRoutes = require('./routes/feed');

//  Initialize express
const app = express();

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Teamwork Api' });
});

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gif', gifRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/feed', feedRoutes);

app.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});
