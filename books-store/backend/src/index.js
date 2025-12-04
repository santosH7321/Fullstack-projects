import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((e) => {
  console.error("Error connecting to MongoDB", e);
})

import express from "express";
import cors from "cors";
import { signin, signup } from "./controllers/user.controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.post("/signup", signup)
app.post("/login", signin)