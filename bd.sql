-- 1️⃣ Tabla de profesionales
CREATE TABLE professionals (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  specialty VARCHAR(100),
  email VARCHAR(120) UNIQUE,
  password TEXT, -- (si más adelante quieres login)
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2️⃣ Tabla de pacientes
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  rut VARCHAR(15),
  email VARCHAR(120) UNIQUE,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3️⃣ Tabla de disponibilidad del profesional
CREATE TABLE availability (
  id SERIAL PRIMARY KEY,
  professional_id INT NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4️⃣ Tabla de citas (agendamientos)
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  professional_id INT NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  patient_id INT REFERENCES patients(id) ON DELETE SET NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed', -- confirmed | cancelled | pending
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5️⃣ (Opcional) Tabla para bloqueos manuales
CREATE TABLE blocks (
  id SERIAL PRIMARY KEY,
  professional_id INT NOT NULL REFERENCES professionals(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  reason VARCHAR(150),
  created_at TIMESTAMP DEFAULT NOW()
);
