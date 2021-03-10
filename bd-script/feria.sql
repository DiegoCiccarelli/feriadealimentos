DROP DATABASE IF EXISTS feria;

CREATE DATABASE feria;

USE feria;

DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre_usuario varchar(50) NOT NULL,
  apellido_usuario varchar(50) NOT NULL,
  email_usuario varchar(50) NOT NULL,
  telefono_usuario varchar(20) NOT NULL,
  contrasena char(60) NOT NULL,
  dni int(10) NOT NULL,
  calle varchar(50) DEFAULT "",
  altura varchar(10) DEFAULT "",
  piso varchar(10) DEFAULT "",
  departamento varchar(10) DEFAULT "",
  barrio varchar(50) DEFAULT "",
  localidad varchar(50) DEFAULT "",
  provincia varchar(50) DEFAULT "",
  avatar varchar(50) DEFAULT NULL,
  tipo_usuario varchar(50) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS productor;
CREATE TABLE productor(
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre_productor varchar(50) NOT NULL,
  apellido_productor varchar(50) NOT NULL,
  email_productor varchar(50) DEFAULT NULL,
  domicilio_productor varchar(100) DEFAULT NULL,
  logotipo varchar(50) DEFAULT NULL,
  telefono_productor varchar(20) DEFAULT NULL,
  nombre_emprendimiento varchar(50) NOT NULL,
  descripcion_productor varchar(200) DEFAULT NULL,
  estado_productor BOOLEAN NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS categoria;
CREATE TABLE categoria(
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre_categoria varchar(50) NOT NULL,
  estado_categoria BOOLEAN NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 

DROP TABLE IF EXISTS producto;
CREATE TABLE producto(
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre_producto varchar(50) NOT NULL,
  descripcion_corta varchar(100) DEFAULT NULL,
  descripcion_larga varchar(200) DEFAULT NULL,
  precio float NOT NULL,
  imagen varchar(100) NOT NULL,
  estado_producto BOOLEAN NOT NULL,
  variacion varchar(50) DEFAULT NULL,
  tamano varchar(50) DEFAULT NULL,
  productor_id int(11) UNSIGNED NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX(productor_id),
  CONSTRAINT productor_id FOREIGN KEY (productor_id) REFERENCES productor(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS carrito;
CREATE TABLE carrito(
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  usuario_id int(11) UNSIGNED NOT NULL,
  estado_carrito varchar(50) NOT NULL,
  total_carrito float NOT NULL,
  metodo_pago varchar(50) NOT NULL,
  forma_entrega varchar(50) NOT NULL,
  nodo_entrega varchar(50) DEFAULT NULL,
  domicilio_entrega varchar(100) DEFAULT NULL,
  observaciones varchar(200) DEFAULT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX(usuario_id),
  CONSTRAINT usuario_id FOREIGN KEY(usuario_id) REFERENCES usuario(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS carrito_producto;
CREATE TABLE carrito_producto(
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  carrito_id int(11) UNSIGNED NOT NULL,
  producto_id int(11) UNSIGNED NOT NULL,
  cantidad int(11) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX(carrito_id),
  INDEX(producto_id),
  FOREIGN KEY(carrito_id) REFERENCES carrito(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY(producto_id) REFERENCES producto(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

DROP TABLE IF EXISTS categoria_producto;
CREATE TABLE categoria_producto (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  categoria_id int(11) UNSIGNED NOT NULL,
  producto_id int(11) UNSIGNED NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX(categoria_id),
  INDEX(producto_id),
  FOREIGN KEY(categoria_id) REFERENCES categoria(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY(producto_id) REFERENCES producto(id) ON DELETE NO ACTION ON UPDATE NO ACTION
);