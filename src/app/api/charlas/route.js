import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

// Crear una nueva charla
export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre } = body; // Solo obtenemos el nombre de la charla

    // Consulta para crear una nueva charla, la fecha se maneja automáticamente
    const query = "INSERT INTO Charlas (nombre) VALUES (?)";
    const values = [nombre];

    await conn.query(query, values);

    return NextResponse.json({ message: "Charla creada exitosamente" });
  } catch (error) {
    console.error("Error creando charla:", error);
    return NextResponse.json(
      { error: "Error creando charla" },
      { status: 500 }
    );
  }
}
//Listar
export async function GET() {
  try {
    const rows = await conn.query("SELECT * FROM Charlas");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error obteniendo charlas:", error);
    return NextResponse.json(
      { error: "Error obteniendo charlas" },
      { status: 500 }
    );
  }
}
