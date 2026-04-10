import express from "express";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://hotel-management-system-zlls.vercel.app"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
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
