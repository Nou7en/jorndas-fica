"use client";
import { useState, useEffect } from "react";

export default function ListaEstudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [idBanner, setIdBanner] = useState("");
  const [estudianteFiltrado, setEstudianteFiltrado] = useState(null);
  const [wristband, setWristband] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [message, setMessage] = useState("");

  // Función para obtener la lista de estudiantes
  const fetchEstudiantes = async () => {
    try {
      const res = await fetch("/api/estudiantes");
      const data = await res.json();
      setEstudiantes(data);
    } catch (error) {
      console.error("Error obteniendo estudiantes:", error);
    }
  };

  // Obtener la lista de estudiantes al cargar el componente
  useEffect(() => {
    fetchEstudiantes();
  }, []);

  // Función para buscar un estudiante por id_banner
  const buscarEstudiante = async () => {
    try {
      const res = await fetch(`/api/estudiantes?id_banner=${idBanner}`);
      const data = await res.json();

      if (res.ok) {
        setEstudianteFiltrado(data);
        setMessage("");
      } else {
        setEstudianteFiltrado(null);
        setMessage(data.message || "Error buscando estudiante");
      }
    } catch (error) {
      console.error("Error buscando estudiante:", error);
      setMessage("Error en el servidor");
    }
  };

  // Función para abrir el modal y seleccionar al estudiante
  const abrirModalAsignar = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setModalVisible(true);
  };

  // Función para cerrar el modal sin asignar
  const cerrarModal = () => {
    setModalVisible(false);
    setSelectedEstudiante(null);
    setWristband("");
  };

  // Función para asignar el wristband_number
  const asignarWristband = async () => {
    if (!wristband) {
      setMessage("Por favor, ingresa un número de wristband.");
      return;
    }

    try {
      const res = await fetch(
        `/api/estudiantes/${selectedEstudiante.id_estudiante}/wristband`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wristband_number: wristband }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Wristband asignado exitosamente");
        fetchEstudiantes(); // Refrescar la lista de estudiantes
        cerrarModal(); // Cerrar el modal
      } else {
        setMessage(data.message || "Error asignando wristband");
      }
    } catch (error) {
      console.error("Error asignando wristband:", error);
      setMessage("Error en el servidor");
    }
  };

  // Función para registrar la entrega de maleta
  const entregarMaleta = async (idEstudiante) => {
    try {
      const res = await fetch(`/api/estudiantes/${idEstudiante}/maleta`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ maleta: true }), // Debe ser un valor booleano
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Maleta entregada exitosamente");
        fetchEstudiantes(); // Refrescar la lista de estudiantes
      } else {
        setMessage(data.message || "Error entregando maleta");
      }
    } catch (error) {
      console.error("Error entregando maleta:", error);
      setMessage("Error en el servidor");
    }
  };

  // Función para volver a ver la lista completa de estudiantes
  const volverLista = () => {
    setEstudianteFiltrado(null);
    setMessage("");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Estudiantes</h1>

      {/* Buscador de estudiantes */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Buscar por ID Banner"
          value={idBanner}
          onChange={(e) => setIdBanner(e.target.value)}
          className="border p-2 flex-grow"
        />
        <button
          onClick={buscarEstudiante}
          className="bg-blue-500 text-white p-2 ml-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {/* Mensajes de error o éxito */}
      {message && <p className="mb-4 text-red-500">{message}</p>}

      {/* Mostrar estudiante filtrado si se buscó */}
      {estudianteFiltrado ? (
        <div key={estudianteFiltrado.id_estudiante} className="border-b p-4">
          <p>Nombre: {estudianteFiltrado.nombre}</p>
          <p>ID Banner: {estudianteFiltrado.id_banner}</p>
          <p>Carrera: {estudianteFiltrado.carrera}</p>
          <p>
            Wristband Number:{" "}
            {estudianteFiltrado.wristband_number || "No asignado"}
          </p>
          <p>
            Maleta Entregada:{" "}
            {estudianteFiltrado.maleta_entregada ? "Sí" : "No"}
          </p>

          <div className="mt-4">
            <button
              onClick={() => abrirModalAsignar(estudianteFiltrado)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
            >
              Asignar Wristband
            </button>

            {/* Opción 1: Desactivar botón */}
            <button
              onClick={() => entregarMaleta(estudianteFiltrado.id_estudiante)}
              className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 ${
                estudianteFiltrado.maleta_entregada
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={estudianteFiltrado.maleta_entregada}
            >
              Entregar Maleta
            </button>

            {/* Opción 2: Ocultar botón */}
            {/* 
            {!estudianteFiltrado.maleta_entregada && (
              <button
                onClick={() => entregarMaleta(estudianteFiltrado.id_estudiante)}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Entregar Maleta
              </button>
            )}
            */}

            <button
              onClick={volverLista}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Volver a lista
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mostrar todos los estudiantes si no se ha buscado */}
          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">ID Banner</th>
                <th className="px-4 py-2">Carrera</th>
                <th className="px-4 py-2">Wristband Number</th>
                <th className="px-4 py-2">Maleta Entregada</th>
                <th className="px-4 py-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.id_estudiante} className="border-b">
                  <td className="px-4 py-2">{estudiante.nombre}</td>
                  <td className="px-4 py-2">{estudiante.id_banner}</td>
                  <td className="px-4 py-2">{estudiante.carrera}</td>
                  <td className="px-4 py-2">
                    {estudiante.wristband_number || "No asignado"}
                  </td>
                  <td className="px-4 py-2">
                    {estudiante.maleta_entregada ? "Sí" : "No"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => abrirModalAsignar(estudiante)}
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Asignar Wristband
                    </button>

                    {/* Opción 1: Desactivar botón */}
                    <button
                      onClick={() => entregarMaleta(estudiante.id_estudiante)}
                      className={`bg-green-500 text-white p-2 rounded hover:bg-green-600 ${
                        estudiante.maleta_entregada
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={estudiante.maleta_entregada}
                    >
                      Entregar Maleta
                    </button>

                    {/* Opción 2: Ocultar botón */}
                    {/* 
                    {!estudiante.maleta_entregada && (
                      <button
                        onClick={() => entregarMaleta(estudiante.id_estudiante)}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                      >
                        Entregar Maleta
                      </button>
                    )}
                    */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Modal para asignar wristband */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Asignar Wristband</h2>
            <input
              type="text"
              value={wristband}
              onChange={(e) => setWristband(e.target.value)}
              placeholder="Número de wristband"
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={cerrarModal}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={asignarWristband}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
