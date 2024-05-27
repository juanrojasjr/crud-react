import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Header from '../Header';
import Footer from '../Footer';
import Cotizaciones from '../Cotizaciones';
import Home from '../Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  const handleStateChange = (value) => {
    setIsAuthenticated(value);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Header isAuthenticated={isAuthenticated} onStateChange={handleStateChange} />}>
        {/* <Route path="/" element={<Header />}> */}
          <Route index element={<Home />} />
          <Route path="/cotizaciones" element={<Cotizaciones />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
