import React, { useEffect, useState } from "react";
import HotelCard from "./HotelCard";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const fetchHotels = async (url = null) => {
    setLoading(true);
    try {
      const apiUrl =
        url ||
        `https://travelconnect.com.ar/tgx/search?country=US&city=Miami&check_in=2025-10-28&check_out=2025-10-29&ages=30,30&currency=USD&language=es&client=travelspirit&access=32146&page=${page}&per_page=20`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      setHotels(data.options || []);
      setNextUrl(data.meta.pagination.next_url || null);
      setPrevUrl(data.meta.pagination.prev_url || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const filteredHotels = hotels.filter((h) =>
    h.hotelName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Buscador */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Buscar hotel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded flex-1"
        />
        <button
          onClick={() => fetchHotels()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {/* Lista de hoteles */}
      {loading ? (
        <p>Cargando hoteles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((option) => (
            <HotelCard key={option.hotelCode} option={option} />
          ))}
        </div>
      )}

      {/* Paginación */}
      <div className="mt-6 flex justify-between">
        <button
          disabled={!prevUrl}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded ${
            prevUrl
              ? "bg-gray-300 hover:bg-gray-400"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          Anterior
        </button>
        <button
          disabled={!nextUrl}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 rounded ${
            nextUrl
              ? "bg-gray-300 hover:bg-gray-400"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default HotelList;
