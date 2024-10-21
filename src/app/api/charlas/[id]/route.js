import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
//Actualizar charla
export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const { nombre, fecha } = body;
    const { id } = params; // Obtener el id de la charla de la URL

    // Inicializamos la consulta y los valores
    let query = "UPDATE Charlas SET nombre = ?";
    let values = [nombre];

    // Si se envía una fecha, la incluimos en la consulta
    if (fecha) {
      query += ", fecha = ?";
      values.push(fecha);
    }

    // Terminamos la consulta agregando la condición WHERE para el id
    query += " WHERE id_charla = ?";
    values.push(id);

    // Ejecutar la consulta
    await conn.query(query, values);

    return NextResponse.json({ message: "Charla actualizada exitosamente" });
  } catch (error) {
    console.error("Error actualizando charla:", error);
    return NextResponse.json(
      { error: "Error actualizando charla" },
      { status: 500 }
    );
  }
}

//Eliminar
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Obtener el id de la charla de la URL

    const query = "DELETE FROM Charlas WHERE id_charla = ?";
    const values = [id];

    await conn.query(query, values);

    return NextResponse.json({ message: "Charla eliminada exitosamente" });
  } catch (error) {
    console.error("Error eliminando charla:", error);
    return NextResponse.json(
      { error: "Error eliminando charla" },
      { status: 500 }
    );
  }
}

//Buscar
export async function GET(req, { params }) {
  try {
    const { id } = params;

    const query = "SELECT * FROM Charlas WHERE id_charla = ?";
    const values = [id];

    const result = await conn.query(query, values);

    if (result.length === 0) {
      return NextResponse.json("No se encontro la charla");
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    {
      error: "Error al buscar charla";
    }
    {
      status: 500;
    }
  }
}
