import { database } from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "../loadEnv.js";

export const register = (req, res) => {
  // CHECK IF USER EXIST ALREADY

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  database.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("identifiant existe déjà");

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

export const login = (req, res) => {
  // CHECK USER

  const q = "SELECT * FROM users WHERE username = ?";

  database.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //CHECK PASSWORD

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("identifiant ou mot de passe incorrect");

    const key = process.env.JWT;
    const token = jwt.sign({ id: data[0].id }, key);
    const { password, ...other } = data[0]; //DATA OTHER THEN PASSWORD

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {};
