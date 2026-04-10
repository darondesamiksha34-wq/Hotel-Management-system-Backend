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
  origin: "https://hotel-management-system-zlls.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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


// import express from "express";
// import 'dotenv/config';
// import connectDB from "./config/mongodb.js";
// import cors from 'cors';
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/authRoutes.js";

// const app = express();

// // connect DB
// connectDB();

// // middlewares
// app.use(express.json());
// app.use(cookieParser());

// // ✅ FINAL CORS FIX
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://hotel-management-system-zlls.vercel.app",
//   "https://hotel-management-system-zlls-9kdlmc994.vercel.app"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("CORS not allowed"), false);
//     }
//   },
//   credentials: true
// }));

// // ✅ FIXED PREFLIGHT (VERY IMPORTANT)
// app.options('*', cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// // test route
// app.get("/", (req, res) => {
//   res.send("Server has started");
// });

// // routes
// app.use('/api/auth', authRouter);

// // start server
// app.listen(process.env.PORT, () =>
//   console.log(`Server is listening on port ${process.env.PORT}`)
// );