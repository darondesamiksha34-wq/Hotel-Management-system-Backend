import express from "express";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";


const app = express();

connectDB();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);

    if (
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.get("/", (req, res) => {
  console.log("Request send");
  res.send("Server has started");
});

app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
