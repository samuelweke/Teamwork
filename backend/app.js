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

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gif', gifRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/feed', feedRoutes);

app.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});
