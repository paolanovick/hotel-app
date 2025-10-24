import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md py-4">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="text-white text-3xl font-extrabold tracking-wider cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg">
          TravelConnect
        </div>
      </div>
    </header>
  );
};

export default Header;
