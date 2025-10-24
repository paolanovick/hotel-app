import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ hotel, room }) => {
  const navigate = useNavigate();
  const getHotelImage = (hotelCode) =>
    `https://picsum.photos/400/250?random=${hotelCode + room.code}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      <img
        src={getHotelImage(hotel.hotelCode)}
        alt={`${hotel.hotelName} - ${room.code}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">{hotel.hotelName}</h2>
          <p className="text-gray-600 mb-1">Habitación: {room.code}</p>
          <p className="text-gray-800 font-semibold mb-2">
            {hotel.price?.currency} {hotel.price?.gross?.toFixed(2)}
          </p>
          <p
            className={`mb-2 ${
              room.refundable ? "text-green-600" : "text-red-600"
            }`}
          >
            {room.refundable ? "Reembolsable" : "No reembolsable"}
          </p>
        </div>
        <button
          onClick={() =>
            navigate(`/hotel/${hotel.hotelCode}`, { state: { hotel, room } })
          }
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Más detalles
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
