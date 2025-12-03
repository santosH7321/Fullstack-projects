const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

mongoose.connect(process.env.DB)
.then(() => {
    console.log("Database connected successfully")
})
.catch(() => {
    console.log("Database connection failed")
})

const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to Filemoon")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})