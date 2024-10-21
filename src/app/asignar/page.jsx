import ListaEstudiantes from "@/components/ListaEstudiantes"; // Asegúrate de que la ruta es correcta
import NavBar from "@/components/NavBar";
export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>Página Principal</h1>
      <ListaEstudiantes />
    </div>
  );
}
