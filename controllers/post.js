import { database } from "../database.js";

//FETCH ALL POSTS & QUERY CATEGORY
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  database.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

//FETCH SINGLE POST
export const getPost = (req, res) => {
  const q =
    "SELECT `username`, `title`, `description`, p.img, u.img AS userImg, `date`, `cat` FROM users u JOIN posts p ON u.id=p.userid WHERE p.id = ?";

  database.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {};
export const updatePost = (req, res) => {};
export const deletePost = (req, res) => {};
