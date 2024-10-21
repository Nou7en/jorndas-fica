import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get("nombre"); // Obtener el nombre desde los parámetros de búsqueda (query params)

    if (!nombre) {
      return NextResponse.json(
        { error: "El nombre es requerido para la búsqueda" },
        { status: 400 }
      );
    }

    // Consulta SQL para buscar la charla por nombre (usando LIKE para coincidencias parciales)
    const query = "SELECT * FROM Charlas WHERE nombre LIKE ?";
    const values = [`%${nombre}%`]; // Usar LIKE para coincidencias parciales

    const [rows] = await conn.query(query, values);

    // Verificar si se encontraron resultados
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron charlas con ese nombre" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows); // Devolver las charlas encontradas
  } catch (error) {
    console.error("Error buscando charla por nombre:", error);
    return NextResponse.json(
      { error: "Error buscando charla" },
      { status: 500 }
    );
  }
}
