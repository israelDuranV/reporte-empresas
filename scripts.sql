DROP DATABASE IF EXISTS reporte_empresas;
CREATE DATABASE reporte_empresas;

use reporte_empresas;

DROP TABLE IF EXISTS tipo_empresa;

CREATE TABLE tipo_empresa(id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO tipo_empresa(name) VALUES("Startup");
INSERT INTO tipo_empresa(name) VALUES("Pyme");
INSERT INTO tipo_empresa(name) VALUES("Coorporativo");
INSERT INTO tipo_empresa(name) VALUES("Multinacional");

DROP TABLE IF EXISTS industrias;

CREATE TABLE industrias(id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO industrias(name) VALUES("Tecnología");
INSERT INTO industrias(name) VALUES("Salud");
INSERT INTO industrias(name) VALUES("Retail");
INSERT INTO industrias(name) VALUES("Manufactura");

DROP TABLE IF EXISTS departamentos;
CREATE TABLE departamentos(id INT(6) AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;
INSERT INTO departamentos(name) VALUES("Finanzas");
INSERT INTO departamentos(name) VALUES("Producción");
INSERT INTO departamentos(name) VALUES("Marketing");
INSERT INTO departamentos(name) VALUES("Recursos Humanos");
INSERT INTO departamentos(name) VALUES("Sistemas");
INSERT INTO departamentos(name) VALUES("Mantenimiento");

DROP TABLE IF EXISTS cargos;
CREATE TABLE cargos(id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;
INSERT INTO cargos(name) VALUES("COO");
INSERT INTO cargos(name) VALUES("CFO");
INSERT INTO cargos(name) VALUES("CTO");
INSERT INTO cargos(name) VALUES("CMO");
INSERT INTO cargos(name) VALUES("Director de Recursos Humanos");
INSERT INTO cargos(name) VALUES("Gerente de Ventas");
INSERT INTO cargos(name) VALUES("Gerente de Producción");
INSERT INTO cargos(name) VALUES("Gerente de Tecnología");
INSERT INTO cargos(name) VALUES("Gerente de finanzas");
INSERT INTO cargos(name) VALUES("Asistente Administrativo");
INSERT INTO cargos(name) VALUES("Reclutador");

DROP TABLE IF EXISTS direccion;
CREATE TABLE direccion(id INT AUTO_INCREMENT PRIMARY KEY, 
    calle VARCHAR(100) NOT NULL, 
    numero INT, 
    ciudad VARCHAR(50), 
    estado VARCHAR(50), 
    pais VARCHAR(50)
) ENGINE=InnoDB;

INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Niños Heroes", 45, "Cdmx", "Cdmx", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Juan Escutia", 55, "Algo", "Aguascalientes", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Homero", 28, "Cancun", "Cancun", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Copernico", 2, "Ixtapan", "Oaxaca", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Insurgentes", 9, "Orizaba", "Veracruz", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Siempre viva", 11, "Nuevo Leon", "Michoacan", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Homero", 28, "Cancun", "Cancun", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Copernico", 2, "Ixtapan", "Oaxaca", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Insurgentes", 9, "Orizaba", "Veracruz", "Mexico");
INSERT INTO direccion(calle, numero, ciudad, estado, pais) VALUES("Siempre viva", 11, "Nuevo Leon", "Michoacan", "Mexico");

DROP TABLE IF EXISTS empresas;
CREATE TABLE empresas(id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL, 
    telefono VARCHAR(10) NOT NULL, 
    tipo_empresa_id INT, FOREIGN KEY (tipo_empresa_id) REFERENCES tipo_empresa(id),
    industria_id INT, FOREIGN KEY (industria_id) REFERENCES industrias(id),
    direccion_id INT, FOREIGN KEY (direccion_id) REFERENCES direccion(id) ON DELETE CASCADE,
    reg_date TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO empresas(nombre, telefono, tipo_empresa_id, industria_id, direccion_id,reg_date) 
VALUES("Bimbo", "5555555555", 1, 2, 1, NOW());
INSERT INTO empresas(nombre, telefono, tipo_empresa_id, industria_id, direccion_id,reg_date) 
VALUES("CFE", "5555555555", 2, 3, 2, NOW());
INSERT INTO empresas(nombre, telefono, tipo_empresa_id, industria_id, direccion_id,reg_date) 
VALUES("Microsoft", "5555555555", 3, 4, 3, NOW());
INSERT INTO empresas(nombre, telefono, tipo_empresa_id, industria_id, direccion_id,reg_date) 
VALUES("Aurrera", "5555555555", 2, 1, 4, NOW());


DROP TABLE IF EXISTS empleados;
CREATE TABLE empleados(id INT AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(50) NOT NULL, 
    paterno VARCHAR(50) NOT NULL, 
    materno VARCHAR(50) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    telefono VARCHAR(15), 
    fecha_nacimiento DATETIME, 
    salario INT,
    empresa_id INT, FOREIGN KEY (empresa_id) REFERENCES empresas(id),
    departamento_id INT, FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
    cargos_id INT, FOREIGN KEY (cargos_id) REFERENCES cargos(id),
    direccion_id INT, FOREIGN KEY (direccion_id) REFERENCES direccion(id) ON DELETE CASCADE,
    estatus BOOLEAN NOT NULL DEFAULT TRUE,
    reg_date TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO empleados(nombre, paterno, materno, email,telefono,fecha_nacimiento, 
salario,empresa_id, departamento_id, cargos_id, direccion_id, estatus, reg_date) 
VALUES("Israel","Duran","Velasco","israel_duran@outlook.com", "5555555555","1985-05-07",
25000, 1, 1, 1, 5, 1, NOW());

INSERT INTO empleados(nombre, paterno, materno, email,telefono,fecha_nacimiento, 
salario,empresa_id, departamento_id, cargos_id, direccion_id, estatus, reg_date) 
VALUES("Axel","Lopez","Garcia","agarcian@yahoo.com", "5555555555","1988-03-01",
25000, 1, 2,2, 6, 1, NOW());

INSERT INTO empleados(nombre, paterno, materno, email,telefono,fecha_nacimiento, 
salario,empresa_id, departamento_id, cargos_id, direccion_id, estatus,reg_date) 
VALUES("Beatriz","Lopez","Caballero","bety@correo.com", "5555555555","1995-04-06",
25000, 2, 2,3, 7,1, NOW());


DROP PROCEDURE IF EXISTS `sp_consultaEmpleados`;
CREATE PROCEDURE `sp_consultaEmpleados`(
    IN `_id` INT,
    IN `_idDireccion` INT,
    IN `_accion` VARCHAR(15),
    IN `_nombre` VARCHAR(50),
    IN `_paterno` VARCHAR(50),
    IN `_materno` VARCHAR(50),
    IN `_email` VARCHAR(100),
    IN `_telefono` VARCHAR(15), 
    IN `_nacimiento` DATETIME,
    IN `_calle` VARCHAR(100),
    IN `_numero` INT,
    IN `_ciudad` VARCHAR(50),
    IN `_estado` VARCHAR(50),
    IN `_pais` VARCHAR(50),
    IN `_salario` INT,
    IN `_empresa` INT,
    IN `_departamento` INT,
    IN `_cargo` INT
)
BEGIN
    DECLARE empleado_id INT;
    DECLARE _direccion INT DEFAULT 0;

    CASE _accion 

        WHEN 'STORE' THEN
            INSERT INTO direccion(calle, numero, ciudad, estado, pais) 
            VALUES(_calle, _numero, _ciudad, _estado, _pais);

            SET _direccion = LAST_INSERT_ID();
    
            INSERT INTO empleados(
                nombre, paterno, materno, email, telefono, fecha_nacimiento, salario,
                empresa_id, departamento_id, cargos_id, direccion_id, estatus, reg_date
            ) VALUES (
                _nombre, _paterno, _materno, _email, _telefono, _nacimiento, _salario,
                _empresa, _departamento, _cargo, _direccion, 1, NOW() -- Aquí se eliminó la coma extra
            );
        SELECT 'ok' AS message, 0 AS error;
        WHEN 'INDEX' THEN
            SELECT e.id, e.nombre, e.paterno, e.materno, e.email, e.telefono, e.fecha_nacimiento, e.salario,
                   em.nombre AS empresa, e.empresa_id, em.telefono AS telempresa, em.tipo_empresa_id, te.name AS tipo_empresa,
                   em.industria_id, i.name AS industria, em.direccion_id, dem.calle, dem.numero, dem.ciudad,
                   dem.estado, dem.pais, e.departamento_id, dd.name AS departamento, e.cargos_id, c.name AS cargo
            FROM empleados e
            INNER JOIN direccion d ON d.id = e.direccion_id
            INNER JOIN departamentos dd ON dd.id = e.departamento_id
            INNER JOIN cargos c ON c.id = e.cargos_id
            INNER JOIN empresas em ON em.id = e.empresa_id
            INNER JOIN tipo_empresa te ON te.id = em.tipo_empresa_id
            INNER JOIN industrias i ON i.id = em.industria_id
            INNER JOIN direccion dem ON dem.id = em.direccion_id
            WHERE e.estatus = 1;

        WHEN 'UPDATE' THEN
            UPDATE empleados  
                SET nombre = _nombre, paterno = _paterno, materno = _materno,
                    email = _email, telefono = _telefono, fecha_nacimiento = _nacimiento, salario = _salario,
                    empresa_id = _empresa, departamento_id = _departamento, cargos_id = _cargo
            WHERE id = _id;

            UPDATE direccion  
                SET calle = _calle, numero = _numero, ciudad = _ciudad, estado = _estado, pais = _pais
            WHERE id = _idDireccion;
        SELECT 'ok' AS message, 0 AS error;
        WHEN 'DELETE' THEN
            UPDATE empleados  
                SET estatus = 0
            WHERE id = _id;
            SELECT 'ok' AS message, 0 AS error;
    END CASE;
END