import { database } from "../database.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  database.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {};
export const addPost = (req, res) => {};
export const updatePost = (req, res) => {};
export const deletePost = (req, res) => {};
