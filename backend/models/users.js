const pool = require('../db/pool');

const users = {
  findAll: () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      const selectQuery = 'SELECT id, name, email FROM users;';
      connection.query(selectQuery, (err, result) => {
        connection.release();
        if(err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  create: (user) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }

      connection.query('INSERT INTO users SET ?;', user, (err, result) => {
        connection.release();
        if(err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }),
  findById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT id FROM users WHERE id LIKE ?;', id, (err, result) => {
        connection.release();
        if(err) {
          console.log(result);
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findUserById: (id) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT name, email FROM users WHERE id LIKE ?;', id, (err, result) => {
        connection.release();
        if(err) {
          console.log(result);
          return reject(err);
        }
        resolve(result);
      });
    });
  }),
  findByEmail: (email) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return reject(err);
      }
      connection.query('SELECT * FROM users WHERE email LIKE ?;', email, (err, result) => {
        connection.release();
        if(err) {
          console.log(result);
          return reject(err);
        }
        resolve(result);
      });
    });
  })
};

module.exports = users;
