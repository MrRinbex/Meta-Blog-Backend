import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import "./loadEnv.js";

const app = express();

// CORS

const FRONT_URL = process.env.FRONT_URL;

app.use(
  cors({
    credentials: true,
    origin: "https://meta-blog-3-0.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    optionsSuccessStatus: 200,
  })
);

// USE JSON & COOKIE PARSER

app.use(express.json());
app.use(cookieParser());

// CLOUDINARY

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog",
    allowed_formats: ["jpg", "png", "webp", "svg"],
    public_id: (req, file) => "blog",
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  res.json(req.file.filename);
});

// ROUTES /

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

//PORT

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Connected on http://localhost:${PORT}`);
});
