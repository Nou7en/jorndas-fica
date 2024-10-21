import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

// Obtener la lista de estudiantes (GET)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id_banner = searchParams.get("id_banner"); // Obtener el id_banner desde los parámetros de la URL

    if (id_banner) {
      // Si id_banner es proporcionado, buscar el estudiante por id_banner
      const query = "SELECT * FROM Estudiantes WHERE id_banner = ?";
      const values = [id_banner];

      const rows = await conn.query(query, values);

      if (rows.length === 0) {
        return NextResponse.json(
          {
            message: "Estudiante no encontrado con el id_banner proporcionado",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(rows[0]); // Retornar el estudiante encontrado
    } else {
      // Si no se proporciona id_banner, devolver todos los estudiantes
      const result = await conn.query("SELECT * FROM Estudiantes");

      // Retornar todos los registros en formato JSON
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("Error obteniendo estudiantes:", error);
    return NextResponse.json(
      { error: "Error obteniendo estudiantes" },
      { status: 500 }
    );
  }
}

// Crear un nuevo estudiante (POST)
export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, id_banner, wristband_number, carrera } = body; // Incluir el campo carrera

    const query =
      "INSERT INTO Estudiantes (nombre, id_banner, wristband_number, carrera) VALUES (?, ?, ?, ?)";
    const values = [nombre, id_banner, wristband_number, carrera]; // Agregar carrera en los valores

    const result = await conn.query(query, values);

    return NextResponse.json({
      message: "Estudiante creado",
      id: result.insertId, // Devolver el ID del estudiante creado
    });
  } catch (error) {
    console.error("Error creando estudiante:", error);
    return NextResponse.json(
      { error: "Error creando estudiante" },
      { status: 500 }
    );
  }
}
