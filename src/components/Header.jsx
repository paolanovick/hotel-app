import React, { useState } from "react";

const Header = ({ onSearch }) => {
  const [city, setCity] = useState("Miami");
  const [checkIn, setCheckIn] = useState("2025-10-28");
  const [checkOut, setCheckOut] = useState("2025-10-29");
  const [ages, setAges] = useState("30,30");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ city, checkIn, checkOut, ages });
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="text-2xl font-bold mb-2 md:mb-0">TravelConnect</div>
      <form className="flex gap-2 flex-wrap" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ciudad"
          className="px-2 py-1 rounded text-black"
        />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
        <input
          type="text"
          value={ages}
          onChange={(e) => setAges(e.target.value)}
          placeholder="Edades (CSV)"
          className="px-2 py-1 rounded text-black"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
        >
          Buscar
        </button>
      </form>
    </header>
  );
};

export default Header;
