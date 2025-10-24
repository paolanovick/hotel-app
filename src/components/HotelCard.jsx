import React from "react";


const HotelCard = ({ option }) => {
  // Imagen aleatoria si no viene
  const imageUrl =
    option.imageUrl ||
    option.media?.images?.[0]?.url ||
    `https://source.unsplash.com/400x300/?hotel,room,building,miami&sig=${option.hotelCode}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300">
      <img
        src={imageUrl}
        alt={option.hotelName}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{option.hotelName}</h2>
        <p className="text-gray-600 mb-1">
          Habitación: {option.rooms[0]?.code}
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Más detalles
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
