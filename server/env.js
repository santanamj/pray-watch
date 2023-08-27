const fs = require('fs');

if (fs.existsSync('./public')) {
  process.env.NODE_ENV = 'production';
  process.env.databaseUri = 'mongodb://msantana:0211ms11d4@ds018258.mlab.com:18258/burguer'; // Databse URI and database name
  process.env.databaseName = 'production database: burguer-service'; // Database name
} else {
  process.env.NODE_ENV = 'development';
  process.env.databaseUri = 'mongodb://msantana:0211ms11d4@ds018258.mlab.com:18258/burguer'; // Databse URI and database name
  process.env.databaseName = 'development database: burguer-service'; // Database name
}
