import Link from "next/link";

const HomePage = () => {
  return (
    <div className="text-center p-6 font-sans">
      {/* Banner Principal */}
      <header className="bg-[url('/images/fica-banner.jpg')] bg-cover bg-center h-[60vh] flex justify-center items-center text-white">
        <div className="bg-black bg-opacity-60 p-8 rounded-md">
          <h1 className="text-5xl font-bold mb-4">Jornadas FICA UDLA</h1>
          <p className="text-2xl mb-6">¡Conéctate, Aprende y Colabora!</p>
          <Link href="/asignar" legacyBehavior>
            <a className="inline-block bg-[#800020] text-white px-6 py-3 rounded-md text-lg hover:bg-[#4a0012] transition-colors">
              Regístrate Ahora
            </a>
          </Link>
        </div>
      </header>

      {/* Sección de Información */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-4xl text-[#800020] font-semibold mb-6">
          Acerca del Evento
        </h2>
        <p className="text-lg text-gray-700 mx-auto max-w-2xl">
          Las Jornadas FICA UDLA son el punto de encuentro para estudiantes,
          profesores y profesionales de la ingeniería. Disfruta de conferencias,
          talleres, y actividades diseñadas para impulsar tu carrera y
          conocimiento en un entorno colaborativo.
        </p>
      </section>

      {/* Sección de Registro */}
      <section className="py-16">
        <h2 className="text-4xl text-[#800020] font-semibold mb-6">
          ¡No te lo pierdas!
        </h2>
        <p className="text-lg text-gray-700 mx-auto max-w-2xl mb-8">
          Asegura tu lugar en el evento más esperado del año. El registro es
          gratuito y los cupos son limitados.
        </p>
        <Link href="/asignar" legacyBehavior>
          <a className="inline-block bg-[#800020] text-white px-8 py-4 rounded-lg text-xl hover:bg-[#4a0012] transition-colors">
            Registrarme
          </a>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
