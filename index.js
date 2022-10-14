import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import "./loadEnv.js";

const app = express();

// USE JSON & COOKIE PARSER

app.use(express.json());
app.use(cookieParser());

// MULTER

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// CORS

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL ?? "http://localhost:4000",
    optionsSuccessStatus: 200,
  })
);

// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

app.listen(8800, () => {
  console.log("Connected");
});
