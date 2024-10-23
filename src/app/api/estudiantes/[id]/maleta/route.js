import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function PATCH(req, { params }) {
  try {
    const { id } = params; // Obtener id_estudiante de los parámetros de la URL
    const body = await req.json(); // Parsear el cuerpo de la solicitud
    const { maleta, refrigerio } = body; // Desestructurar el valor de maleta y refrigerio

    // Construir la consulta SQL dinámicamente en función de los campos enviados
    let query = "UPDATE Estudiantes SET";
    const values = [];

    if (maleta !== undefined) {
      query += " maleta_entregada = ?";
      values.push(maleta);
    }

    if (refrigerio !== undefined) {
      if (values.length > 0) query += ",";
      query += " refrigerio_entregado = ?";
      values.push(refrigerio);
    }

    query += " WHERE id_estudiante = ?";
    values.push(id);

    // Ejecutar la consulta con los valores proporcionados
    await conn.query(query, values);

    return NextResponse.json({ message: "Actualización exitosa" });
  } catch (error) {
    console.error("Error actualizando estudiante:", error);
    return NextResponse.json(
      { error: "Error actualizando estudiante" },
      { status: 500 }
    );
  }
}
