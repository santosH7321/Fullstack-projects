import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

app.use(express.json());

app.post("/api/v1/auth", AuthRouter);