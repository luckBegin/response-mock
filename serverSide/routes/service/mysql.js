var mysql      = require('mysql');
let mysqlConfig = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'api_mock',
    multipleStatements: true
}
let mysqlFnc = function(con){
    var connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    con(connection)
};
module.exports = mysqlFnc;