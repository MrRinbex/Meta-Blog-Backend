import mysql from "mysql2";
import "./loadEnv.js";

export const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
