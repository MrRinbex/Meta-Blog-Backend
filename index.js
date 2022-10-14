import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./loadEnv.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL ?? "http://localhost:4000",
    optionsSuccessStatus: 200,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

app.listen(8800, () => {
  console.log("Connected");
});
