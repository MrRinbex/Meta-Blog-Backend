import { database } from "../database.js";
import jwt from "jsonwebtoken";
import "../loadEnv.js";

//FETCH ALL POSTS & QUERY CATEGORY
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  database.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err).status(500);
    return res.status(200).json(data);
  });
};

//FETCH SINGLE POST
export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `description`, p.img, u.img AS userImg, `date`, `cat` FROM users u JOIN posts p ON u.id=p.userid WHERE p.id = ?";

  database.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err).status(500);
    return res.status(200).json(data[0]);
  });
};

//CREATE POST

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  const key = process.env.JWT_KEY;

  jwt.verify(token, key, (err, userInfo) => {
    if (err) return res.status(403).json("Not valid Token");

    const q =
      "INSERT INTO posts(`title`, `description`, `img`, `cat`, `date`, `userid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    database.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(data);
      }
      return res.json("Post Created").status(201);
    });
  });
};

//UPDATE POST

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  const key = process.env.JWT_KEY;

  jwt.verify(token, key, (err, userInfo) => {
    if (err) return res.status(403).json("Not valid Token");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`description`=?,`img`=?,`cat`=? WHERE `id` = ? AND `userid` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
    ];

    database.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(500).json(data);
      }
      return res.json("Post has been updated !").status(201);
    });
  });
};

//DELETE POST

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  const key = process.env.JWT_KEY;

  jwt.verify(token, key, (err, userInfo) => {
    if (err) return res.status(403).json("Not valid Token");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id=? AND `userid`=?";

    database.query(q, [postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json("You are not allowed to delete this post");
      }
      return res.json("Post deleted");
    });
  });
};
