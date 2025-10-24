import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const HotelDetail = () => {
  const { hotelCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState(location.state?.hotel || null);
  const [loading, setLoading] = useState(!hotel);

  useEffect(() => {
    // Solo buscar si no tenemos el hotel en el estado
    if (!hotel) {
      const fetchHotel = async () => {
        setLoading(true);
        try {
          // Usar fechas dinámicas (30 días desde hoy)
          const today = new Date();
          const checkIn = new Date(today);
          checkIn.setDate(today.getDate() + 30);
          const checkOut = new Date(checkIn);
          checkOut.setDate(checkIn.getDate() + 1);

          const formatDate = (date) => date.toISOString().split("T")[0];

          const res = await fetch(
            `https://travelconnect.com.ar/tgx/search?country=US&city=Miami&check_in=${formatDate(
              checkIn
            )}&check_out=${formatDate(
              checkOut
            )}&ages=30,30&currency=USD&language=es&client=travelspirit&access=32146&page=1&per_page=20`
          );
          const data = await res.json();
          const foundHotel = data.options?.find(
            (h) => h.hotelCode === hotelCode
          );
          setHotel(foundHotel);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchHotel();
    }
  }, [hotelCode, hotel]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Hotel no encontrado
        </h2>
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/")}
        >
          Volver a la búsqueda
        </button>
      </div>
    );
  }

  // Generar imágenes
  const randomId = hotel.hotelCode
    ? hotel.hotelCode
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000
    : Math.floor(Math.random() * 1000);

  const images = hotel.media?.images?.map((img) =>
    img.url.startsWith("http://")
      ? img.url.replace("http://", "https://")
      : img.url
  ) || [
    `https://picsum.photos/seed/${hotel.hotelCode || randomId}/600/400`,
    `https://picsum.photos/seed/${hotel.hotelCode || randomId + 1}/600/400`,
    `https://picsum.photos/seed/${hotel.hotelCode || randomId + 2}/600/400`,
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Botón volver */}
        <button
          className="mb-4 flex items-center text-blue-600 hover:text-blue-700 transition"
          onClick={() => navigate(-1)}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Galería de imágenes */}
          <div className="relative h-96 overflow-hidden">
            <div className="flex overflow-x-auto gap-2 h-full">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${hotel.hotelName} ${idx + 1}`}
                  className="h-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(
                      hotel.hotelName?.slice(0, 20) || "Hotel"
                    )}`;
                  }}
                />
              ))}
            </div>
          </div>

          {/* Información del hotel */}
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">{hotel.hotelName}</h1>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Columna izquierda */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Habitación
                  </h3>
                  <p className="text-lg text-gray-800">
                    {hotel.rooms[0]?.description ||
                      hotel.rooms[0]?.code ||
                      "No disponible"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Régimen
                  </h3>
                  <p className="text-lg text-gray-800">
                    {hotel.boardCode === "SA"
                      ? "Solo alojamiento"
                      : hotel.boardCode}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Código de hotel
                  </h3>
                  <p className="text-lg text-gray-800">{hotel.hotelCode}</p>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Precio total
                  </h3>
                  <p className="text-3xl font-bold text-blue-600">
                    {hotel.price.currency} {hotel.price.gross.toFixed(2)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
                    Política de cancelación
                  </h3>
                  <p
                    className={`text-lg font-semibold ${
                      hotel.cancelPolicy.refundable
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {hotel.cancelPolicy.refundable
                      ? "✓ Reembolsable"
                      : "✗ No reembolsable"}
                  </p>
                </div>

                {hotel.cancelPolicy.refundable &&
                  hotel.cancelPolicy.cancelPenalties?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                        Penalidades por cancelación
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-600">
                        {hotel.cancelPolicy.cancelPenalties.map(
                          (penalty, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>
                                Hasta{" "}
                                {new Date(
                                  penalty.deadline
                                ).toLocaleDateString()}
                              </span>
                              <span className="font-semibold">
                                {penalty.value} {penalty.currency}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>

            {/* Botón de reserva */}
            <button
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
              onClick={() => alert("Funcionalidad de reserva en desarrollo")}
            >
              Reservar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
