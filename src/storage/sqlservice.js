import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectTimeout: 20000
})

export function insert(tableName, objectDatas, callback) {
  const keys = Object.keys(objectDatas);
  const values = Object.values(objectDatas);
  const keysQueryStr = `(${keys.map(k => `\`${k}\``).join(",")})`;
  const keysParamQueryStr = `(${keys.map(() => "?").join(",")})`;
  connection.query(
    `INSERT INTO \`${tableName}\` ${keysQueryStr} VALUES ${keysParamQueryStr}`,
    values,
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.insertId);
    }
  );
}

export default connection;