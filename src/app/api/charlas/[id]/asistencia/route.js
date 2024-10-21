import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
//Registrar
export async function POST(req, { params }) {
  try {
    const { id } = params; // Obtener id_charla de la URL
    const { wristband_number } = await req.json(); // Obtener el número de wristband desde el cuerpo de la solicitud

    // Consulta para obtener el id_estudiante en base al número de wristband
    const getStudentQuery = `
      SELECT id_estudiante FROM Estudiantes WHERE wristband_number = ?
    `;
    const studentResult = await conn.query(getStudentQuery, [wristband_number]);

    // Verificar si se encontró un estudiante con ese número de wristband
    if (!studentResult || studentResult.length === 0) {
      return NextResponse.json(
        {
          message:
            "Estudiante no encontrado con el número de wristband proporcionado",
        },
        { status: 404 }
      );
    }

    // Obtener el id_estudiante del primer resultado
    const id_estudiante = studentResult[0].id_estudiante;

    // Consulta SQL para registrar la asistencia
    const insertQuery = `
      INSERT INTO Asistencia (id_charla, id_estudiante) VALUES (?, ?)
    `;
    const insertValues = [id, id_estudiante];

    // Ejecutar la consulta INSERT
    await conn.query(insertQuery, insertValues);

    return NextResponse.json({ message: "Asistencia registrada exitosamente" });
  } catch (error) {
    console.error("Error registrando asistencia:", error);
    return NextResponse.json(
      { error: "Error registrando asistencia" },
      { status: 500 }
    );
  }
}

//Listar
export async function GET(req, { params }) {
  try {
    const { id } = params; // Obtener id_charla de la URL

    // Depuración: Imprimir el ID de charla recibido
    console.log("ID de charla recibido:", id);

    const query = `
      SELECT Estudiantes.nombre, Estudiantes.id_banner, Estudiantes.wristband_number
      FROM Asistencia
      INNER JOIN Estudiantes ON Asistencia.id_estudiante = Estudiantes.id_estudiante
      WHERE Asistencia.id_charla = ?
    `;
    const values = [id];

    // Ejecutar la consulta y desestructurar las filas
    const rows = await conn.query(query, values);

    // Depuración: Imprimir el resultado completo de la consulta
    console.log("Resultado completo de la consulta:", rows);

    // Verificar si rows es undefined o tiene longitud 0
    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron asistencias" },
        { status: 404 }
      );
    }

    // Devolver los resultados de la consulta, incluyendo wristband_number
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error obteniendo asistencia:", error);
    return NextResponse.json(
      { error: "Error obteniendo asistencia" },
      { status: 500 }
    );
  }
}

//Eliminar estudiante
export async function DELETE(req, { params }) {
  try {
    const { id } = params; // Obtener id_charla de la URL
    const { wristband_number } = await req.json(); // Obtener el número de wristband desde el cuerpo de la solicitud

    // Consulta para obtener el id_estudiante en base al wristband_number
    const getStudentQuery = `SELECT id_estudiante FROM Estudiantes WHERE wristband_number = ?`;

    // Ejecutar la consulta y obtener el resultado
    const studentResult = await conn.query(getStudentQuery, [wristband_number]);

    // Verificar si studentResult tiene datos
    if (!studentResult || studentResult.length === 0) {
      return NextResponse.json(
        {
          message:
            "Estudiante no encontrado con el número de wristband proporcionado",
        },
        { status: 404 }
      );
    }

    // Obtener el id_estudiante del primer resultado
    const id_estudiante = studentResult[0].id_estudiante;

    // Depuración: Imprimir los valores a eliminar
    console.log("id_charla:", id);
    console.log("id_estudiante:", id_estudiante);

    // Consulta SQL para eliminar el registro de asistencia
    const deleteQuery = `DELETE FROM Asistencia WHERE id_charla = ? AND id_estudiante = ?`;
    const deleteValues = [id, id_estudiante];

    // Ejecutar la consulta DELETE
    const deleteResult = await conn.query(deleteQuery, deleteValues);

    // Verificar cuántas filas fueron afectadas
    if (deleteResult.affectedRows === 0) {
      console.log("Resultado de DELETE:", deleteResult);
      return NextResponse.json(
        { message: "No se encontró asistencia para eliminar" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Asistencia eliminada exitosamente" });
  } catch (error) {
    console.error("Error eliminando asistencia:", error);
    return NextResponse.json(
      { error: "Error eliminando asistencia" },
      { status: 500 }
    );
  }
}
