import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="font-bold text-xl">Cardify</h1>
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/editor">Editor</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  )
}
