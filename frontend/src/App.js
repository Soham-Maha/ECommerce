import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Pricing from "./pages/Pricing/Pricing";
import Features from "./pages/Features/Features";
import Contact from "./pages/Contact/Contact";
import ProductsFree from "./pages/FreeProducts/ProductsFree";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productsFree" element={<ProductsFree />} />
        </Routes>
        <Footer/>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
