// Import the mysql package
const mysql = require('mysql');

// Database configuration
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'Bharath@01',
  database: 'calculator_history'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
function query(sql, params) {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      // Execute the query
      connection.query(sql, params, (error, results) => {
        // Release the connection back to the pool
        connection.release();

        if (error) {
          return reject(error);
        }

        // Resolve with the query results
        resolve(results);
      });
    });
  });
}

// Export the query function and pool for use in other modules
module.exports = { query, pool };
