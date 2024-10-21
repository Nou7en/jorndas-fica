import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
//Asignar Numero
export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const { wristband_number } = body; // Obtener el número de wristband del cuerpo de la solicitud
    const { id } = params; // Obtener el id del estudiante de la URL

    // Consulta SQL para actualizar el número de wristband
    const query =
      "UPDATE Estudiantes SET wristband_number = ? WHERE id_estudiante = ?";
    const values = [wristband_number, id];

    // Ejecutar la consulta
    await conn.query(query, values);

    return NextResponse.json({
      message: "Wristband actualizado para el estudiante",
    });
  } catch (error) {
    console.error("Error actualizando wristband:", error);
    return NextResponse.json(
      { error: "Error actualizando wristband" },
      { status: 500 }
    );
  }
}
