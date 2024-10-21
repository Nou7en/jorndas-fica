import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

// Buscar un estudiante por su id_estudiante
export async function GET(req, { params }) {
  try {
    const { id } = params; // Obtener id_estudiante de la URL

    // Consulta SQL para buscar al estudiante por su id_estudiante
    const query = "SELECT * FROM Estudiantes WHERE id_estudiante = ?";
    const values = [id];

    // Ejecutar la consulta
    const result = await conn.query(query, values);
    console.log(result);
    // Imprimir el resultado de la consulta para depuración
    console.log("Resultado completo de la consulta:", result);

    // Verificar si el resultado es un array y tiene datos
    if (result.length === 0) {
      return NextResponse.json(
        { error: "Estudiante no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]); // Devolver los datos del estudiante encontrado
  } catch (error) {
    console.error("Error buscando estudiante:", error);
    return NextResponse.json(
      { error: "Error buscando estudiante" },
      { status: 500 }
    );
  }
}
// Actualizar un estudiante existente (PUT)
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const { nombre, id_banner, wristband_number } = body;
    const { id } = params; // Obtener id_estudiante de la URL

    const query =
      "UPDATE Estudiantes SET nombre = ?, id_banner = ?, wristband_number = ? WHERE id_estudiante = ?";
    const values = [nombre, id_banner, wristband_number, id];

    await conn.query(query, values);

    return NextResponse.json({ message: "Estudiante actualizado" });
  } catch (error) {
    console.error("Error actualizando estudiante:", error);
    return NextResponse.json(
      { error: "Error actualizando estudiante" },
      { status: 500 }
    );
  }
}
//Eliminar
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Obtener id_estudiante de la URL

    const query = "DELETE FROM Estudiantes WHERE id_estudiante = ?";
    const values = [id];

    await conn.query(query, values);

    return NextResponse.json({ message: "Estudiante eliminado" });
  } catch (error) {
    console.error("Error eliminando estudiante:", error);
    return NextResponse.json(
      { error: "Error eliminando estudiante" },
      { status: 500 }
    );
  }
}
