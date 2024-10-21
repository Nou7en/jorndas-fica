// components/NavBar.jsx
import Link from "next/link";

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/asignar">Lista Estudiantes</Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/registro">Lista Charlas</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    padding: "10px",
    backgroundColor: "#800020", // Rojo vino
  },
  navList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
  },
  navItem: {
    marginRight: "20px",
  },
  navItemLink: {
    color: "white", // Letras blancas
    textDecoration: "none",
  },
};

export default NavBar;
