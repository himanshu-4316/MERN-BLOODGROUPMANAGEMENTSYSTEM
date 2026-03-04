import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import donorRoutes from "./routes/donorRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS middleware (IMPORTANT)
app.use(cors({
  // origin: "http://localhost:5173",
  // methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true
}));

app.use(express.json());

const port = process.env.PORT || 3000;

// routes
app.use("/donors", donorRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
