CREATE TABLE job_postings (
  id SERIAL PRIMARY KEY,

  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  employment_type TEXT CHECK (employment_type IN ('full_time', 'part_time', 'contract', 'intern')),

  department_id INT REFERENCES departments(id),
  role_id INT REFERENCES roles(id),

  salary_min NUMERIC,
  salary_max NUMERIC,

  status TEXT CHECK (status IN ('draft', 'open', 'closed', 'archived')) DEFAULT 'draft',

  created_by INT REFERENCES employees(id),
  approved_by INT REFERENCES employees(id) DEFAULT NULL,

  posted_at TIMESTAMP,
  closes_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);