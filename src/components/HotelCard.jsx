import React from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ option }) => {
  const navigate = useNavigate();

  // Imagen placeholder si no hay en la API
  const imageUrl =
    option.imageUrl ||
    option.media?.images?.[0]?.url ||
    "https://via.placeholder.com/400x300";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300">
      <img
        src={imageUrl}
        alt={option.hotelName}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{option.hotelName}</h2>
        <p className="text-gray-600">
          Habitación: {option.rooms[0].code || option.rooms[0].description}
        </p>
        <p className="text-gray-800 font-semibold">
          Desde {option.price.currency} {option.price.gross.toFixed(2)}
        </p>
        <p
          className={`font-semibold ${
            option.cancelPolicy.refundable ? "text-green-600" : "text-red-600"
          }`}
        >
          {option.cancelPolicy.refundable ? "Reembolsable" : "No reembolsable"}
        </p>
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => navigate(`/hotel/${option.hotelCode}`)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
