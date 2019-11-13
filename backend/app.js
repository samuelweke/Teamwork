const express = require('express');
const bodyParser = require('body-parser');

//  Routes
const userRoutes = require('./routes/employee');
const gifRoutes = require('./routes/gif');
const articleRoutes = require('./routes/article');
const feedRoutes = require('./routes/feed');

//  Initialize express
const app = express();

const port = process.env.PORT || '8000';

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gif', gifRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/feed', feedRoutes);

app.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});
