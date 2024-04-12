import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Register from "./components/Register/Register";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
