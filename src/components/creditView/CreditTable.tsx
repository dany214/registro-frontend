import { useEffect, useState } from "react";
import { getCredits } from "../../api/creditService";
import type { Credit } from "../../types/Credit";

export default function CreditList() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [filters, setFilters] = useState({
    clientName: "",
    clientId: "",
    commercial: "",
  });

  const fetchCredits = async () => {
    try {
      const data = await getCredits({
        clientName: filters.clientName || undefined,
        clientId: filters.clientId || undefined,
        commercial: filters.commercial || undefined,
      });
      setCredits(data);
    } catch (error) {
      console.error("Error al obtener créditos:", error);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCredits();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Créditos Registrados
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-end gap-4 mb-8"
        >
          <div className="flex flex-col flex-1">
            <label className="text-gray-600 text-sm mb-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              name="clientName"
              value={filters.clientName}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-gray-600 text-sm mb-1">ID</label>
            <input
              type="text"
              name="clientId"
              value={filters.clientId}
              onChange={handleChange}
              placeholder="Ej. 1023456789"
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="text-gray-600 text-sm mb-1">Comercial</label>
            <input
              type="text"
              name="commercial"
              value={filters.commercial}
              onChange={handleChange}
              placeholder="Ej. Carlos Gómez"
              className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => {
                setFilters({ clientName: "", clientId: "", commercial: "" });
                fetchCredits();
              }}
              className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Limpiar
            </button>
          </div>
        </form>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-sm text-gray-700">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Cédula</th>
                <th className="py-3 px-4">Monto prestado</th>
                <th className="py-3 px-4">Plazo</th>
                <th className="py-3 px-4">Tasa de interés</th>
                <th className="py-3 px-4">Comercial</th>
                <th className="py-3 px-4">Fecha de registro</th>
              </tr>
            </thead>
            <tbody>
              {credits.length > 0 ? (
                credits.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-100 transition-colors border-b"
                  >
                    <td className="py-3 px-4">{c.clientName}</td>
                    <td className="py-3 px-4">{c.clientId}</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      ${c.amount.toLocaleString("es-CO")}
                    </td>
                    <td className="py-3 px-4">{c.termMonths} meses</td>
                    <td className="py-3 px-4">{c.interestRate}%</td>
                    <td className="py-3 px-4">{c.commercial}</td>
                    <td className="py-3 px-4">
                      {new Date(c.createdAt || "").toLocaleDateString("es-CO")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No hay créditos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
