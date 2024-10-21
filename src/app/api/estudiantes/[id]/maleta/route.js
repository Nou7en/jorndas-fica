import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // Obtener id_estudiante de los parámetros de la URL
    const body = await req.json(); // Parsear el cuerpo de la solicitud
    const { maleta } = body; // Desestructurar el valor de maleta

    // Actualizar la columna maleta en la base de datos para el estudiante con el id proporcionado
    const query =
      "UPDATE Estudiantes SET maleta_entregada = ? WHERE id_estudiante = ?";
    const values = [maleta, id];

    await conn.query(query, values);

    return NextResponse.json({ message: "Maleta entregada exitosamente" });
  } catch (error) {
    console.error("Error entregando maleta:", error);
    return NextResponse.json(
      { error: "Error entregando maleta" },
      { status: 500 }
    );
  }
}
