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

const root = process.cwd()
const express = require("express");
const cors = require("cors")
const {v4: uniqueId} = require("uuid")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, next)=>{
        next(null, 'files/')
    },
    filename: (req, file, next)=>{
        const nameArr = file.originalname.split(".")
        const ext = nameArr.pop()
        const name = `${uniqueId()}.${ext}`
        next(null, name)
    }
})
const upload = multer({storage: storage})

const { signup, login } = require("./controller/user.controller");
const { createFile, fetchFiles, deleteFile, downloadFile } = require("./controller/file.controller")
const { fetchDashboard } = require("./controller/dashboard.controller")
const { verifyToken } = require("./controller/token.controller")
const app = express()
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("view"));

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))

// Ui endpoint
const getPath = (filename)=>{
    return path.join(root, "view", filename)
}

app.get("/signup", (req, res)=>{
    const p = getPath("signup.html")
    res.sendFile(p)
})

app.get("/login", (req, res)=>{
    const p = getPath("index.html")
    res.sendFile(p)
})

app.get("/", (req, res)=>{
    const p = getPath("index.html")
    res.sendFile(p)
})

app.get("/dashboard", (req, res)=>{
    const p = getPath("app/dashboard.html")
    res.sendFile(p)
})

app.get("/history", (req, res)=>{
    const p = getPath("app/history.html")
    res.sendFile(p)
})

app.get("/files", (req, res)=>{
    const p = getPath("app/files.html")
    res.sendFile(p)
})

// API endpoint
app.post("/api/signup", signup)
app.post("/api/login", login)
app.post("/api/file",upload.single('file'), createFile)
app.get("/api/file", fetchFiles)
app.delete("/api/file/:id", deleteFile)
app.get("/api/file/download/:id", downloadFile)
app.get('/api/dashboard', fetchDashboard)
app.post("/api/token/verify", verifyToken)