import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelList from "./components/HotelList";
import HotelDetail from "./components/HotelDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:hotelCode" element={<HotelDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
