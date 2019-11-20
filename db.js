const pool = require('./queries');

//  CREATE employee TABLE
const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    employee(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(65),
      lastname VARCHAR(65),
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      gender VARCHAR(1),
      job_role VARCHAR(65),
      department VARCHAR(65),
      address VARCHAR(128),
      createdOn TIMESTAMP DEFAULT Now() 
    )`;
  pool.query(queryText)
    .then(() => pool.end())
    .catch(() => pool.end());
};

// CREATE article TABLE
const createArticleTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    article(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(300),
      article text ,
      user_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
      created_on TIMESTAMP DEFAULT Now() 
    )`;
  pool.query(queryText)
    .then(() => pool.end())
    .catch(() => pool.end());
};

//  CREATE article_comment table
const createArticleCommentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    article_comment(
      comment_id SERIAL PRIMARY KEY,
      comment text NOT NULL ,
      user_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
      article_id INTEGER REFERENCES article(article_id) ON DELETE CASCADE,
      created_on TIMESTAMP DEFAULT Now()
    )`;
  pool.query(queryText)
    .then(() => pool.end())
    .catch(() => pool.end());
};

//  CREATE GIF TABLE
const createGifTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    gif(
      gif_id SERIAL PRIMARY KEY,
      title text NOT NULL ,
      cloudinary_id VARCHAR (3000),
      url VARCHAR(3000) ,
      user_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
      created_on TIMESTAMP DEFAULT Now()
    )`;
  pool.query(queryText)
    .then(() => pool.end())
    .catch(() => pool.end());
};

//  CREATE gif_comment TABLE
const createGifCommentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    gif_comment(
      comment_id SERIAL PRIMARY KEY,
      comment text NOT NULL ,
      user_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
      gif_id INTEGER REFERENCES gif(gif_id) ON DELETE CASCADE,
      created_on TIMESTAMP DEFAULT Now()
    )`;
  pool.query(queryText)
    .then(() => pool.end())
    .catch(() => pool.end());
};

pool.on('remove', () => {
  process.exit(0);
});

//  CREATE ALL TABLES
const createAllTables = () => {
  createUsersTable();
  createArticleTable();
  createArticleCommentTable();
  createGifTable();
  createGifCommentTable();
};

// DROP ALL TABLES
// const dropAllTables = () => {
//   dropUsersTable();
//   dropArticleTable();
//   dropArticleCommentTable();
//   dropGifTable();
//   dropGifCommentTable();
// };

module.exports = {
  createUsersTable,
  createArticleTable,
  createArticleCommentTable,
  createGifTable,
  createGifCommentTable,
  createAllTables,
};

require('make-runnable');
