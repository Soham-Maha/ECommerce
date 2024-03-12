import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie'
import Register from './components/Register/Register';
import Homepage from './components/Homepage/Homepage';

function App() {
  return <BrowserRouter>
    <CookiesProvider>   
      <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </CookiesProvider>
  </BrowserRouter>;
}

export default App;
