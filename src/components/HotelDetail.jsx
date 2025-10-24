import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HotelDetail = () => {
  const { hotelCode } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://travelconnect.com.ar/tgx/search?country=US&city=Miami&check_in=2025-10-28&check_out=2025-10-29&ages=30,30&currency=USD&language=es&client=travelspirit&access=32146&page=1&per_page=20`
        );
        const data = await res.json();
        const foundHotel = data.options.find((h) => h.hotelCode === hotelCode);
        setHotel(foundHotel);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelCode]);

  if (loading) return <p className="p-6">Cargando detalles...</p>;
  if (!hotel) return <p className="p-6">Hotel no encontrado.</p>;

  // Tomar todas las imágenes disponibles o placeholder
  const images = hotel.media?.images?.map((img) =>
    img.url.startsWith("http://")
      ? img.url.replace("http://", "https://")
      : img.url
  ) || [
    `https://source.unsplash.com/600x400/?hotel,room,miami&sig=${hotel.hotelCode}`,
  ];


  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      {/* Galería de imágenes */}
      <div className="md:w-1/2 flex overflow-x-auto gap-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${hotel.hotelName} ${idx + 1}`}
            className="w-80 h-60 rounded-lg object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Panel de datos */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{hotel.hotelName}</h2>
        <p className="text-gray-700">
          Habitación: {hotel.rooms[0]?.description || "No disponible"}
        </p>
        <p className="text-gray-700">
          Régimen:{" "}
          {hotel.boardCode === "SA" ? "Solo alojamiento" : hotel.boardCode}
        </p>
        <p className="text-gray-900 font-semibold">
          Precio: {hotel.price.currency} {hotel.price.gross.toFixed(2)}
        </p>
        <p
          className={`font-semibold ${
            hotel.cancelPolicy.refundable ? "text-green-600" : "text-red-600"
          }`}
        >
          {hotel.cancelPolicy.refundable ? "Reembolsable" : "No reembolsable"}
        </p>

        {hotel.cancelPolicy.refundable &&
          hotel.cancelPolicy.cancelPenalties.length > 0 && (
            <ul className="text-sm text-gray-500">
              {hotel.cancelPolicy.cancelPenalties.map((penalty, idx) => (
                <li key={idx}>
                  Hasta {new Date(penalty.deadline).toLocaleDateString()}:{" "}
                  {penalty.value} {penalty.currency}
                </li>
              ))}
            </ul>
          )}

        {/* Botones */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => alert("Reservar hotel (simulado)")}
          >
            Reservar
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
