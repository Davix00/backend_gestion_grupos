create database universidad;
go
use universidad;
go
-- Tabla para Divisiones
CREATE TABLE Divisiones (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL
);
go
insert into Divisiones values ('Sistemas automotrices');
insert into Divisiones values ('Tecnologías de la infromación');
insert into Divisiones values ('Energías alternativas y medio ambiente');
insert into Divisiones values ('Gastronomía');
insert into Divisiones values ('Procesos industriales');
-- FALTA MECATRONICA, MANTENIMIENTO INDUSTRIAL, NEGOCIOS

-- Tabla para Especialidades
CREATE TABLE Especialidades (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    division_id INT,
    FOREIGN KEY (division_id) REFERENCES Divisiones(id)
);
go
insert into Especialidades values ('Maestría en Analítica de Datos',2);
insert into Especialidades values ('Maestría en Ingeniería Ambiental y Sustentabilidad',3);
-- Falta Maestría en Ingeniería en Mecatrónica, Maestría en Gestión e Innovación en las Organizaciones, Maestría en Gestión del Mantenimiento 4.0

-- Tabla para Edificios
CREATE TABLE Edificios (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL
);
go
insert into Edificios values ('D1');
insert into Edificios values ('D2');
insert into Edificios values ('D3');
insert into Edificios values ('D4');

-- Tabla para Aulas
CREATE TABLE Aulas (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    edificio_id INT,
    FOREIGN KEY (edificio_id) REFERENCES Edificios(id)
);
go
insert into Aulas values ('A-1',1);
insert into Aulas values ('A-2',1);
insert into Aulas values ('A-3',1);
insert into Aulas values ('A-4',1);

insert into Aulas values ('B-1',2);
insert into Aulas values ('B-2',2);
insert into Aulas values ('B-3',2);
insert into Aulas values ('B-4',2);
--FALTA C,D

-- Tabla para Periodos
CREATE TABLE Periodos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL
);
go
insert into Periodos values ('Septiembre - Diciembre');
insert into Periodos values ('Mayo - Agosto');
-- Falta Enero - Abri

create table cuatrimestre (
	id INT PRIMARY KEY IDENTITY(1,1),
	grado VARCHAR(50)
)
go
insert into cuatrimestre values ('1');
insert into cuatrimestre values ('2');
insert into cuatrimestre values ('3');
insert into cuatrimestre values ('4');
insert into cuatrimestre values ('5');
insert into cuatrimestre values ('6');
go
-- Tabla para Grupos
CREATE TABLE Grupos (
    id INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(255) NOT NULL,
    especialidad_id INT,
    periodo_id INT,
	cuatrimestre_id INT,
    FOREIGN KEY (especialidad_id) REFERENCES Especialidades(id),
    FOREIGN KEY (periodo_id) REFERENCES Periodos(id),
    FOREIGN KEY (cuatrimestre_id) REFERENCES cuatrimestre(id)
);
go
insert into Grupos values ('A',1,1,6);
go
select g.id, g.nombre, g.especialidad_id, e.nombre as nombre_especialidad, g.periodo_id, p.nombre as nombre_periodo, g.cuatrimestre_id, c.grado as grado_cuatrimestre
from grupos as g left join Especialidades as e on g.especialidad_id = e.id 
left join Periodos as p on g.periodo_id = p.id left join cuatrimestre as c on g.cuatrimestre_id = c.id

