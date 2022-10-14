import { database } from "../database.js";
import jwt from "jsonwebtoken";
import "../loadEnv.js";

//FETCH ALL USERS
export const getUsers = (req, res) => {
  const q = "SELECT * FROM users";
  database.query(q, [req.query], (err, data) => {
    if (err) return res.json(err).status(500);
    return res.status(200).json(data);
  });
};

//FETCH SINGLE USER
export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id=?";

  database.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err).status(500);
    return res.status(200).json(data[0]);
  });
};
