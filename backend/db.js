const pool = require('./queries');

//  CREATE employee TABLE
const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    employee(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(65),
        lastname VARCHAR(65) ,
        email VARCHAR(200) NOT NULLL UNIQUE,
        password VARCHAR(200) NOT NULL,
        gender VARCHAR(7) ,
        job_role VARCHAR(100),
        department VARCHAR(100),
        address VARCHAR(300),
        createdOn TIMESTAMP DEFAULT Now()
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// CREATE article TABLE
const createArticleTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    article(
        id SERIAL PRIMARY KEY,
        title VARCHAR(300) NOT NULL,
        article text NOT NULL ,
        emp_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
        created_on TIMESTAMP DEFAULT Now()
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

//  DROP article Table
const dropArticleTable = () => {
  const queryText = 'DROP TABLE IF EXISTS article';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

//  CREATE article_comment table
const createArticleCommentTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        article_comments(
            comment_id SERIAL PRIMARY KEY,
            comment text NOT NULL ,
            emp_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
            article_id INTEGER REFERENCES article(id) ON DELETE CASCADE,
            created_on TIMESTAMP DEFAULT Now()
        )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

//  DROP article_comment TABLE 
const dropArticlesCommentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS article_comments';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop gifs  table
 */
/*
const dropgifsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS gifs';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
*/

/**
 * Create Articles tables
 */
const createGifTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        gif(
            id SERIAL PRIMARY KEY,
            title text NOT NULL ,
            cloudinary_id VARCHAR (3000) NOT NULL,
            url VARCHAR(3000) NOT NULL,
            emp_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
            created_on TIMESTAMP DEFAULT Now()
        )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop articles table
 */
const dropGifsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS gifs';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create Articles Comments table
 */
const createGifsCommentsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        gif_comment(
            comment_id SERIAL PRIMARY KEY,
    comment text NOT NULL ,
    emp_id INTEGER REFERENCES employee(id) ON DELETE CASCADE,
    gif_id INTEGER REFERENCES gif(id) ON DELETE CASCADE,
    created_on TIMESTAMP DEFAULT Now()
        )`;
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop comments table
 */
const dropGifsCommentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS gifs_comments';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUsersTable();
  createArticleTable();
  createArticlesCommentsTable();
  createGifsTable();
  createGifsCommentsTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUsersTable();
  dropArticlesTable();
  dropArticlesCommentsTable();
  dropGifsTable();
  dropGifsCommentsTable();
};

module.exports = {
  createUsersTable,
  dropUsersTable,
  createArticleTable,
  dropArticleTable,
  createArticlesCommentsTable,
  dropArticlesCommentsTable,
  createGifsTable,
  dropGifsTable,
  createGifsCommentsTable,
  dropGifsCommentsTable,
  createAllTables,
  dropAllTables,
};

require('make-runnable');