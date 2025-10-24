import React from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ option }) => {
  const navigate = useNavigate();

  // Generar un número aleatorio basado en el hotelCode para tener consistencia
  const randomId = option.hotelCode
    ? option.hotelCode
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000
    : Math.floor(Math.random() * 1000);

  const imageUrl =
    option.imageUrl ||
    option.media?.images?.[0]?.url ||
    `https://picsum.photos/seed/${option.hotelCode || randomId}/400/300`;

  const handleViewDetails = () => {
    // Navegar a la página de detalles pasando el hotel completo
    navigate(`/hotel/${option.hotelCode}`, {
      state: { hotel: option },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300">
      <img
        src={imageUrl}
        alt={option.hotelName}
        className="w-full h-48 object-cover"
        onError={(e) => {
          // Fallback si la imagen falla
          e.target.src = `https://placehold.co/400x300/e2e8f0/64748b?text=${encodeURIComponent(
            option.hotelName?.slice(0, 20) || "Hotel"
          )}`;
        }}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{option.hotelName}</h2>
        <p className="text-gray-600 mb-1">
          Habitación: {option.rooms[0]?.code || "N/A"}
        </p>
        <p className="text-gray-800 font-semibold mb-2">
          Precio: {option.price.currency} {option.price.gross.toFixed(2)}
        </p>
        <p
          className={`mb-2 ${
            option.cancelPolicy.refundable ? "text-green-600" : "text-red-600"
          }`}
        >
          {option.cancelPolicy.refundable ? "Reembolsable" : "No reembolsable"}
        </p>
        <button
          onClick={handleViewDetails}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
        >
          Más detalles
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
