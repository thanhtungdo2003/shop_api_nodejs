const dotenv = require("dotenv");
dotenv.config(); // Load biến môi trường trước khi tạo kết nối
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    connectTimeout: 20000
});

function addPerm(username, perm, callback) {
    connection.query("CALL sp_user_add_perm(?, ?)", [username, perm], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    })
}
module.exports = { connection, addPerm };
