"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Importar Link

export default function ListaCharlas() {
  const [charlas, setCharlas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCharla, setEditingCharla] = useState(null); // Charla que se está editando
  const [message, setMessage] = useState("");

  // Función para obtener la lista de charlas
  const fetchCharlas = async () => {
    try {
      const res = await fetch("/api/charlas");
      const data = await res.json();
      setCharlas(data);
    } catch (error) {
      console.error("Error obteniendo charlas:", error);
    }
  };

  // Obtener la lista de charlas al cargar el componente
  useEffect(() => {
    fetchCharlas();
  }, []);

  // Función para abrir el modal de crear o editar charla
  const abrirModalCrearCharla = () => {
    setEditingCharla(null); // No estamos editando, sino creando
    setModalVisible(true);
    setNombre("");
    setFecha("");
    setHora("");
  };

  const abrirModalEditarCharla = (charla) => {
    setEditingCharla(charla); // Establecemos la charla que vamos a editar
    setNombre(charla.nombre);
    const [fechaStr, horaStr] = charla.fecha.split("T");
    setFecha(fechaStr);
    setHora(horaStr.substring(0, 5)); // Eliminar los segundos de la hora
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
    setNombre("");
    setFecha("");
    setHora("");
  };

  // Función para crear o editar una charla
  const guardarCharla = async () => {
    if (!nombre || !fecha || !hora) {
      setMessage("Por favor, completa todos los campos.");
      return;
    }

    const fechaHora = `${fecha} ${hora}`;

    try {
      const res = await fetch(
        editingCharla
          ? `/api/charlas/${editingCharla.id_charla}`
          : "/api/charlas",
        {
          method: editingCharla ? "PATCH" : "POST", // Usar PATCH si estamos editando, POST si estamos creando
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, fecha: fechaHora }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(
          editingCharla
            ? "Charla actualizada exitosamente"
            : "Charla creada exitosamente"
        );
        cerrarModal();
        fetchCharlas(); // Refrescar la lista de charlas automáticamente
      } else {
        setMessage(data.message || "Error guardando charla");
      }
    } catch (error) {
      console.error("Error guardando charla:", error);
      setMessage("Error en el servidor");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Charlas</h1>

      {/* Botón para abrir el modal de crear charla */}
      <button
        onClick={abrirModalCrearCharla}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
      >
        Crear Charla
      </button>

      {/* Mensajes de error o éxito */}
      {message && <p className="mb-4 text-red-500">{message}</p>}

      {/* Mostrar lista de charlas */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Fecha y Hora</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {charlas.map((charla) => (
            <tr key={charla.id_charla} className="border-b">
              <td className="px-4 py-2">{charla.nombre}</td>
              <td className="px-4 py-2">
                {new Date(charla.fecha).toLocaleString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => abrirModalEditarCharla(charla)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <Link href={`/asistentes/${charla.id_charla}`} legacyBehavior>
                  <a className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Ver Asistentes
                  </a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear o editar una charla */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingCharla ? "Editar charla" : "Crear nueva charla"}
            </h2>

            <input
              type="text"
              placeholder="Nombre de la charla"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-end">
              <button
                onClick={cerrarModal}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={guardarCharla}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                {editingCharla ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
