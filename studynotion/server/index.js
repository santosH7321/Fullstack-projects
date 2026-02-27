import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import AuthRouter from "./routes/auth.routes.js";
import { cloudinaryConnect } from "./config/cloudinary.js";
import CategoryRouter from "./routes/category.routes.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();
cloudinaryConnect();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})



app.post("/api/v1/auth", AuthRouter);
app.post("/api/v1/category", CategoryRouter)