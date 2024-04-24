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
import ProductDetailsFree from "./pages/FreeProdDetails/ProductDetailsFree";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import PaidProducts from "./pages/PremiumProd/PaidProducts"
import ProdDetails from "./pages/ProdDetailsPaid/ProdDetails";
import Profile from "./pages/Profile/Profile";
import SavedProducts from "./pages/SavedProducts/SavedProducts";

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
          <Route path="/productFree/:id" element={<ProductDetailsFree />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/premiumProducts" element={<PaidProducts />} />
          <Route path="/product/:id" element={<ProdDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/savedProducts" element={<SavedProducts />} />
        </Routes>
        <Footer/>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
