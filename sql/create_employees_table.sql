CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  entra_oid TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role_id INT REFERENCES roles(id),
  department_id INT REFERENCES departments(id), 
   manager_id INT REFERENCES employees(id), -- ✅ self reference
  salary NUMERIC,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);