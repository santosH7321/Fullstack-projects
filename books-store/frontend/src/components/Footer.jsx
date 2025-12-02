const Footer = () => {
  return (
    <footer className="bg-white border-t py-6 mt-10">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Bookshop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;