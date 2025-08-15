import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage'
import DevicesPage from "./pages/DevicesPage";
import CustomerPage from "./pages/CustomerPage";
import ServicePage from "./pages/ServicePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/services" element={<ServicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
