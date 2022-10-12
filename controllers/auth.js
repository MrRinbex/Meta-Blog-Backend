import { database } from "../database.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
  // CHECK IF USER EXIST ALREADY

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  database.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist");

    // HASH THE PASSWORD AND CREATE THE USER

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    database.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("user created");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
