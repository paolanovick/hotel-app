import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelCard from "./components/HotelCard";
import HotelDetail from "./components/HotelDetail";

const App = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  // Fechas dinámicas: 30 días desde hoy
  const getDefaultDates = () => {
    const today = new Date();
    const checkIn = new Date(today);
    checkIn.setDate(today.getDate() + 30); // 30 días desde hoy

    const checkOut = new Date(checkIn);
    checkOut.setDate(checkIn.getDate() + 1); // 1 noche

    const formatDate = (date) => {
      return date.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    return {
      checkIn: formatDate(checkIn),
      checkOut: formatDate(checkOut),
    };
  };

  const [dates, setDates] = useState(getDefaultDates());

  const fetchHotels = async (url = null) => {
    setLoading(true);
    setError(null);
    setWarnings([]);

    try {
      const apiUrl =
        url ||
        `https://travelconnect.com.ar/tgx/search?country=US&city=Miami&check_in=${dates.checkIn}&check_out=${dates.checkOut}&ages=30,30&currency=USD&language=es&client=travelspirit&access=32146&page=${page}&per_page=20`;

      console.log("🔍 Buscando con URL:", apiUrl);

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error(
          `Error ${res.status}: ${res.statusText || "Error al cargar hoteles"}`
        );
      }

      const data = await res.json();

      console.log("📦 Respuesta de la API:", data);

      // Verificar si hay errores en la respuesta
      if (data.errors && data.errors.length > 0) {
        const errorMessages = data.errors.map((e) => e.description).join(". ");
        setError(errorMessages);
      }

      // Guardar warnings para mostrar al usuario
      if (data.warnings && data.warnings.length > 0) {
        setWarnings(data.warnings);
      }

      setHotels(data.options || []);
      setNextUrl(data.meta?.pagination?.next_url || null);
      setPrevUrl(data.meta?.pagination?.prev_url || null);

      // Si no hay hoteles, mostrar mensaje informativo
      if (!data.options || data.options.length === 0) {
        setError(
          "No se encontraron hoteles disponibles para estas fechas. Intenta con fechas diferentes."
        );
      }
    } catch (err) {
      console.error("❌ Error completo:", err);
      setError(err.message);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const filteredHotels = hotels.filter((h) =>
    h.hotelName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDateChange = (field, value) => {
    setDates((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setPage(1); // Resetear a página 1
    fetchHotels();
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50 p-6">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">
                  Buscar Hoteles en Miami
                </h1>

                {/* Formulario de búsqueda */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={dates.checkIn}
                        onChange={(e) =>
                          handleDateChange("checkIn", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={dates.checkOut}
                        onChange={(e) =>
                          handleDateChange("checkOut", e.target.value)
                        }
                        min={dates.checkIn}
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar por nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre del hotel..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                  >
                    {loading ? "Buscando..." : "🔍 Buscar Hoteles"}
                  </button>
                </div>

                {/* Warnings */}
                {warnings.length > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Advertencias:
                        </h3>
                        <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                          {warnings.map((w, i) => (
                            <li key={i}>{w.description}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-lg font-medium text-red-800">
                          No se pudieron cargar los hoteles
                        </h3>
                        <p className="mt-2 text-sm text-red-700">{error}</p>
                        <button
                          onClick={() => {
                            setDates(getDefaultDates());
                            setTimeout(() => fetchHotels(), 100);
                          }}
                          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                          Usar fechas válidas (30 días desde hoy)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading */}
                {loading && (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600 text-lg">
                        Buscando hoteles en Miami...
                      </p>
                    </div>
                  </div>
                )}

                {/* Lista de hoteles */}
                {!loading && !error && filteredHotels.length > 0 && (
                  <>
                    <p className="text-gray-600 mb-4">
                      Se encontraron {filteredHotels.length} hoteles
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredHotels.map((option) => (
                        <HotelCard key={option.hotelCode} option={option} />
                      ))}
                    </div>

                    {/* Paginación */}
                    <div className="mt-8 flex justify-between items-center">
                      <button
                        disabled={!prevUrl || loading}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className={`px-6 py-3 rounded-lg font-medium transition ${
                          prevUrl && !loading
                            ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        ← Anterior
                      </button>
                      <span className="text-gray-600 font-medium">
                        Página {page}
                      </span>
                      <button
                        disabled={!nextUrl || loading}
                        onClick={() => setPage((p) => p + 1)}
                        className={`px-6 py-3 rounded-lg font-medium transition ${
                          nextUrl && !loading
                            ? "bg-gray-300 hover:bg-gray-400 text-gray-800"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Siguiente →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          }
        />
        <Route path="/hotel/:hotelCode" element={<HotelDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
