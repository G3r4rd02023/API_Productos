create database api_productos;
use api_productos;

 
create table Productos(
IdProducto int auto_increment primary key,
CodigoBarra varchar(50),
Nombre varchar(50),
Categoria varchar(50), 
Marca varchar (50),
Precio decimal(10,2)
);

-- PROCEDIMIENTOS ALMACENADOS

-- CREAR PRODUCTO
DELIMITER //
CREATE PROCEDURE sp_CrearProducto
(
  IN p_codigoBarra varchar(50),
  IN p_nombre varchar(50),
  IN p_categoria varchar(50),
  IN p_marca varchar(50),
  IN p_precio decimal(10,2)
)
BEGIN
START TRANSACTION;
  INSERT INTO Productos (CodigoBarra, Nombre, Categoria, Marca, Precio)
  VALUES (p_codigoBarra, p_nombre, p_categoria, p_marca, p_precio);
 COMMIT; 
END 
//


-- ACTUALIZAR PRODUCTO
DELIMITER //
CREATE PROCEDURE sp_EditarProducto
(
  IN p_idProducto int,
  IN p_codigoBarra varchar(50),
  IN p_nombre varchar(50),
  IN p_categoria varchar(50),
  IN p_marca varchar(50),
  IN p_precio decimal(10,2)
)
BEGIN
START TRANSACTION;
  UPDATE Productos
  SET CodigoBarra = p_codigoBarra,
    Nombre = p_nombre,
    Categoria = p_categoria,
    Marca = p_marca,
    Precio = p_precio
  WHERE IdProducto = p_idProducto;
 COMMIT; 
END
//

-- Eliminar Producto
DELIMITER //
CREATE PROCEDURE sp_EliminarProducto
(
  IN p_idProducto int
)
BEGIN
START TRANSACTION;
  DELETE FROM Productos
  WHERE IdProducto = p_idProducto;
COMMIT; 
END;
//

-- listar productos
DELIMITER //
CREATE PROCEDURE sp_ListarProductos()
BEGIN
START TRANSACTION;
  SELECT *
  FROM Productos;
COMMIT;  
END;
//

-- SELECCIONAR UN PRODUCTO

DELIMITER //
CREATE PROCEDURE sp_VerProducto
(
  IN p_idProducto int
)
BEGIN
START TRANSACTION;
  SELECT *
  FROM Productos
  WHERE IdProducto = p_idProducto;
  COMMIT;
END;
//


