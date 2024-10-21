"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Importar useRouter

export default function ListaAsistente() {
  const [asistentes, setAsistentes] = useState([]);
  const [wristbandNumberAdd, setWristbandNumberAdd] = useState(""); // Estado para el campo de añadir
  const [wristbandNumberRemove, setWristbandNumberRemove] = useState(""); // Estado para el campo de eliminar
  const [message, setMessage] = useState("");

  const params = useParams();
  const router = useRouter(); // Hook para redirigir
  const charlaId = params.id_charla; // Obtener id_charla del parámetro dinámico

  // Función para obtener la lista de asistentes de la charla
  const fetchAsistentes = async () => {
    try {
      const res = await fetch(`/api/charlas/${charlaId}/asistencia`);
      const data = await res.json();

      console.log("Datos de la API en el frontend:", data); // Depuración

      setAsistentes(data);
    } catch (error) {
      console.error("Error obteniendo asistentes:", error);
    }
  };

  // Obtener la lista de asistentes al cargar el componente
  useEffect(() => {
    if (charlaId) {
      fetchAsistentes();
    }
  }, [charlaId]);

  // Función para añadir un asistente
  const añadirAsistente = async () => {
    try {
      const res = await fetch(`/api/charlas/${charlaId}/asistencia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wristband_number: wristbandNumberAdd }), // Usar el estado para añadir
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Asistente añadido exitosamente");
        fetchAsistentes(); // Refrescar la lista de asistentes
        setWristbandNumberAdd(""); // Limpiar el campo de añadir
      } else {
        setMessage(data.message || "Error añadiendo asistente");
      }
    } catch (error) {
      console.error("Error añadiendo asistente:", error);
      setMessage("Error en el servidor");
    }
  };

  // Función para eliminar un asistente por número de wristband
  const eliminarAsistente = async () => {
    try {
      const res = await fetch(`/api/charlas/${charlaId}/asistencia`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wristband_number: wristbandNumberRemove }), // Usar el estado para eliminar
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Asistente eliminado exitosamente");
        fetchAsistentes(); // Refrescar la lista de asistentes
        setWristbandNumberRemove(""); // Limpiar el campo después de eliminar
      } else {
        setMessage(data.message || "Error eliminando asistente");
      }
    } catch (error) {
      console.error("Error eliminando asistente:", error);
      setMessage("Error en el servidor");
    }
  };

  // Función para regresar a la lista de charlas
  const regresarListaCharlas = () => {
    router.push("/registro"); // Redirigir a la página de charlas
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Asistentes de la Charla {charlaId}
      </h2>

      {/* Mensaje de error o éxito */}
      {message && <p className="text-red-500 mb-4">{message}</p>}

      {/* Formulario para agregar un asistente */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Añadir Asistente</h3>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Wristband Number"
            value={wristbandNumberAdd} // Campo separado para añadir
            onChange={(e) => setWristbandNumberAdd(e.target.value)} // Manejar solo el estado de añadir
            className="border p-2 flex-grow rounded-lg"
          />
          <button
            onClick={añadirAsistente}
            className="bg-blue-500 text-white p-2 ml-4 rounded-lg hover:bg-blue-600"
          >
            Añadir
          </button>
        </div>
      </div>

      {/* Formulario para eliminar un asistente */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">Eliminar Asistente</h3>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Wristband Number"
            value={wristbandNumberRemove} // Campo separado para eliminar
            onChange={(e) => setWristbandNumberRemove(e.target.value)} // Manejar solo el estado de eliminar
            className="border p-2 flex-grow rounded-lg"
          />
          <button
            onClick={eliminarAsistente}
            className="bg-red-500 text-white p-2 ml-4 rounded-lg hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Mostrar lista de asistentes */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">ID Banner</th>
              <th className="px-4 py-2">Wristband Number</th>
            </tr>
          </thead>
          <tbody>
            {asistentes.length > 0 ? (
              asistentes.map((asistente) => (
                <tr key={asistente.id_estudiante} className="border-b">
                  <td className="px-4 py-2">{asistente.nombre}</td>
                  <td className="px-4 py-2">{asistente.id_banner}</td>
                  <td className="px-4 py-2">
                    {asistente.wristband_number}
                  </td>{" "}
                  {/* Mostrar wristband number */}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan="3">
                  No hay asistentes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón para regresar a la lista de charlas */}
      <div className="mt-6">
        <button
          onClick={regresarListaCharlas}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
        >
          Volver a Lista de Charlas
        </button>
      </div>
    </div>
  );
}
