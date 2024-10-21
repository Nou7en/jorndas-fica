import ListaCharlas from "@/components/ListaCharlas";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>Página Charlas</h1>

      <ListaCharlas />
    </div>
  );
}
