-- Crear la tabla Estudiantes
CREATE TABLE Estudiantes (
    id_estudiante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    id_banner VARCHAR(255) NOT NULL UNIQUE,
    wristband_number VARCHAR(50) UNIQUE NOT NULL,
    maleta_entregada tinyint(1) DEFAULT 0,
    carrera VARCHAR(255)
);

-- Crear la tabla Materiales
CREATE TABLE Materiales (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    maleta TINYINT(1) DEFAULT 1,
    cartuchera TINYINT(1) DEFAULT 1,
    otro TINYINT(1) DEFAULT 1,
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id_estudiante) ON DELETE CASCADE
);

-- Crear la tabla Charlas
CREATE TABLE Charlas (
    id_charla INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL
);

-- Crear la tabla Asistencia
CREATE TABLE Asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_estudiante INT NOT NULL,
    id_charla INT NOT NULL,
    FOREIGN KEY (id_estudiante) REFERENCES Estudiantes(id_estudiante) ON DELETE CASCADE,
    FOREIGN KEY (id_charla) REFERENCES Charlas(id_charla) ON DELETE CASCADE,
    CONSTRAINT unique_estudiante_charla UNIQUE (id_estudiante,id_charla)
);
