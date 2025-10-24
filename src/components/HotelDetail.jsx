import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HotelDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotel = location.state?.hotel;
  const room = location.state?.room;

  if (!hotel || !room) {
    return (
      <div className="p-6">
        <p>No se encontró información del hotel.</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    );
  }

  const getHotelImage = (hotelCode, roomCode) =>
    `https://picsum.photos/600/400?random=${hotelCode + roomCode}`;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => navigate("/")}
      >
        Volver
      </button>
      <div className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row overflow-hidden">
        <img
          src={getHotelImage(hotel.hotelCode, room.code)}
          alt={`${hotel.hotelName} - ${room.code}`}
          className="w-full lg:w-1/2 h-64 lg:h-auto object-cover"
        />
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-2">{hotel.hotelName}</h2>
          <p className="text-gray-600 mb-1">Habitación: {room.code}</p>
          <p className="text-gray-800 font-semibold mb-2">
            Precio: {hotel.price?.currency} {hotel.price?.gross?.toFixed(2)}
          </p>
          <p
            className={`mb-2 ${
              room.refundable ? "text-green-600" : "text-red-600"
            }`}
          >
            {room.refundable ? "Reembolsable" : "No reembolsable"}
          </p>

          {hotel.cancelPolicy?.refundable &&
            hotel.cancelPolicy.cancelPenalties.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">
                  Penalidades de cancelación:
                </h3>
                <ul className="text-gray-600">
                  {hotel.cancelPolicy.cancelPenalties.map((penalty, idx) => (
                    <li key={idx}>
                      Hasta {new Date(penalty.deadline).toLocaleDateString()}:{" "}
                      {penalty.value} {penalty.currency}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
