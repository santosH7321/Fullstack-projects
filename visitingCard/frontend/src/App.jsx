import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Editor from "./pages/Editor"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
