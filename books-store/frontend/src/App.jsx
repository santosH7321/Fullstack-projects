import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Books from "./components/Books";
import Categories from "./components/Categories";
import Cart from "./components/Cart";
import SignIn from "./components/Signin";

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/account" element= {<SignIn />} />
          </Routes>
        <Footer />
    </BrowserRouter>
  );
};

export default App;
