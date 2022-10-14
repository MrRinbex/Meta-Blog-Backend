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

//UPDATE USER

export const updateUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  const key = process.env.JWT_KEY;

  jwt.verify(token, key, (err, userInfo) => {
    if (err) return res.status(403).json("Not valid Token");

    const userId = req.params.id;
    const q = "UPDATE users SET `username`=?,`email`=?,`img`=? WHERE id=? ";

    const values = [req.body.username, req.body.email, req.body.img];

    database.query(q, [...values, userId, userInfo.id], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json(data);
      }
      return res.json("User has been updated !").status(201);
    });
  });
};

//DELETE USER

export const deleteUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  const key = process.env.JWT_KEY;

  jwt.verify(token, key, (err, userInfo) => {
    if (err) return res.status(403).json("Not valid Token");

    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id=?";

    database.query(q, [userId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json(err);
      }
      return res.json("User deleted");
    });
  });
};
