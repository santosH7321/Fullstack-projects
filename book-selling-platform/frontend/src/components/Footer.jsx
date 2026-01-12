export default function Footer() {
  return (
    <footer className="mt-auto bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">
              📚 BookStore
            </h3>
            <p className="mt-1 text-sm text-gray-500 max-w-sm">
              Read. Learn. Grow.  
              A modern online bookstore built for developers and learners.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="hover:text-white transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="my-6 h-px bg-white/10" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} BookStore. All rights reserved.
          </p>

          <p className="text-gray-500">
            Build by <span className="text-gray-300">Santosh</span> {" "}
            <span className="text-gray-300">Kumar</span> 
          </p>
        </div>
      </div>
    </footer>
  )
}
