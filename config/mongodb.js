// import mongoose from "mongoose";
// import "dotenv/config";

// const connectDB = async () => {
//   mongoose.connection.on("connected", () => console.log("Database Connected"));
//   await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
//     useNewUrlParser: true,
//   });
// };
// export default connectDB;




import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;