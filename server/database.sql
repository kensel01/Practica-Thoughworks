CREATE TABLE permisos (
    permisos_id SERIAL PRIMARY KEY,
    edit_epica BOOLEAN,
    edit_task BOOLEAN,
    edit_project BOOLEAN,
    rol CHAR(50)
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    user_name CHAR(50) NOT NULL,
    user_password CHAR(255) NOT NULL,
    email CHAR(50) NOT NULL
);

CREATE TABLE Proyectos (
    proyect_id SERIAL PRIMARY KEY,
    name_proyect CHAR(255) NOT NULL UNIQUE,
    proyect_description TEXT NOT NULL,
    create_by INT REFERENCES Users(user_id)
);

CREATE TABLE Colaboradores (
    id_proyect INT REFERENCES Proyectos(proyect_id),
    id_user INT REFERENCES Users(user_id),
    cargo CHAR(50),
    permisos_id INT REFERENCES permisos(permisos_id),
    PRIMARY KEY (id_proyect, id_user)
);

CREATE TABLE Epica (
    epica_id SERIAL PRIMARY KEY,
    proyect_id INT REFERENCES Proyectos(proyect_id),
    title CHAR(50),
    description CHAR(120)
);

CREATE TABLE Sprint (
    sprint_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES Proyectos(proyect_id),
    sprint_name CHAR(50) NOT NULL,
    duracion INT,
    date_start DATE,
    date_end DATE
);

CREATE TABLE Tareas (
    task_id SERIAL PRIMARY KEY,
    sprint_id INT REFERENCES Sprint(sprint_id),
    epica_id INT REFERENCES Epica(epica_id),
    task_title CHAR(50) NOT NULL,
    task_description CHAR(255) NOT NULL,
    task_state INT NOT NULL,
    date_start DATE,
    date_end DATE
);

CREATE TABLE usuario_tarea (
    user_task_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    task_id INT REFERENCES Tareas(task_id)
);