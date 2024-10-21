import ListaAsistente from "@/components/ListaAsistente"; // Asegúrate de que la ruta es correcta
import NavBar from "@/components/NavBar";
export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>Asistencia</h1>
      <ListaAsistente />
    </div>
  );
}
