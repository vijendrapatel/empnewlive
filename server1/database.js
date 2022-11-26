var mysql = require('mysql');

var conn = mysql.createConnection({
            host: "103.117.212.187",
            user: "apnaorga_jbifs",
            password: "JU3}?RSuSU(%",
            database: "apnaorga_employee_management"
});
// var conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "apnaorga_w2cadmin"
// }); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;