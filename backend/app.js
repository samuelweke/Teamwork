const express = require('express');
const bodyParser = require('body-parser');

//  Routes
const userRoutes = require('./routes/employee');

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

app.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
});
