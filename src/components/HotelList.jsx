import React, { useEffect, useState } from "react";

import RoomCard from "./RoomCard";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(
          "https://travelconnect.com.ar/tgx/search?country=US&city=Miami&check_in=2025-10-"
        );
        const data = await res.json();
        setHotels(data.options || []);
      } catch (err) {
        console.error(err);
        setError("Error al cargar hoteles");
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando hoteles...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Hoteles Disponibles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) =>
          hotel.rooms.map((room, idx) => (
            <RoomCard
              key={`${hotel.hotelCode}-${idx}`}
              hotel={hotel}
              room={room}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HotelList;
