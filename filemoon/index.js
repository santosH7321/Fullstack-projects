const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")
mongoose.connect(process.env.DB)
.then(() => {
    console.log("Database connected successfully ✅")
})
.catch(() => {
    console.log("Database connection failed ❌")
})

const express = require("express");
const { signup } = require("./controller/user.controller");
const app = express()
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("view"));


app.post("/signup", signup)