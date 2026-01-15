import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
// import { seedDefaultUsers } from "./seed/defaultUsers.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // await seedDefaultUsers();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
