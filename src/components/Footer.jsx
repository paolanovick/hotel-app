import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-start">
          <div className="text-2xl font-bold mb-2">TravelConnect</div>
          <p>Explora y reserva los mejores hoteles</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Enlaces</h3>
          <ul>
            <li>Inicio</li>
            <li>Hoteles</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Soporte</h3>
          <ul>
            <li>Ayuda</li>
            <li>FAQ</li>
            <li>Política de privacidad</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
