-- Consultas

CREATE DATABASE VarietyVault;

USE VarietyVault;

CREATE TABLE tipos_documentos(
    id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY, -- PK
    tipo_documento VARCHAR(10) NOT NULL
);

CREATE TABLE Permisos(
    id_permiso INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_permiso VARCHAR(50) NOT NULL
);

CREATE TABLE Roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_rol VARCHAR(20) NOT NULL
);

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_usuario VARCHAR(50) NOT NULL,
    id_rol INT NOT NULL,
    id_tipo_documento INT NOT NULL,
    numero_documento INT NOT NULL UNIQUE,
    correo_electronico VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(10) NOT NULL,
    estado_usuario BOOLEAN DEFAULT 1 NOT NULL,    
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol),
    FOREIGN KEY (id_tipo_documento) REFERENCES tipos_documentos(id_tipo_documento)
);

CREATE TABLE Almacenes(
    id_almacen INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_almacen VARCHAR(20) NOT NULL,
    direccion_almacen VARCHAR(30) NOT NULL,
    descripcion_almacen VARCHAR(100) NOT NULL,
    estado_almacen BOOLEAN DEFAULT 1 NOT NULL
);

CREATE TABLE Categorias(
    id_categoria INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_categoria VARCHAR(20) NOT NULL,
    estado_categoria BOOLEAN DEFAULT 1 NOT NULL
);

CREATE TABLE Entradas(    
    id_entrada INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATE NOT NULL,
    origen_entrada VARCHAR(20) NOT NULL,
    id_almacen INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen)
);

CREATE TABLE Salidas(
    id_salida INT AUTO_INCREMENT PRIMARY KEY,
    fecha_hora DATE NOT NULL,
    destino_salida VARCHAR(20) NOT NULL,
    id_almacen INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen)
);

CREATE TABLE Productos(
    id_producto INT AUTO_INCREMENT PRIMARY KEY, -- PK
    nombre_producto VARCHAR(100) NOT NULL,    
    stock_minimo INT NOT NULL,
    promedio_costo INT NOT NULL,
    precio_venta INT NOT NULL,
    imagen VARCHAR(250),
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE Roles_Permisos(
    id_rol INT NOT NULL,
    id_permiso INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES Roles(id_rol),
    FOREIGN KEY (id_permiso) REFERENCES Permisos(id_permiso)
);

CREATE TABLE Almacenes_Usuarios(
    id_almacen INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Productos_Entradas(
    id_producto INT NOT NULL,
    id_entrada INT NOT NULL,
    cantidad_entrada INT NOT NULL,
    precio_compra INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_entrada) REFERENCES Entradas(id_entrada)
);

CREATE TABLE Productos_Salidas(
    id_producto INT NOT NULL,
    id_salida INT NOT NULL,
    cantidad_salida INT NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto),
    FOREIGN KEY (id_salida) REFERENCES Salidas(id_salida)
);

CREATE TABLE Almacenes_Productos(
    id_almacen INT NOT NULL,
    id_producto INT NOT NULL,
    referencia_producto VARCHAR (10) NOT NULL UNIQUE,
    estado_producto_almacen BOOLEAN DEFAULT 1 NOT NULL,
    cantidad_producto_almacen INT NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

CREATE TABLE Almacenes_Categorias(
    id_almacen INT NOT NULL,
    id_categoria INT NOT NULL,
    estado_categoria_almacen BOOLEAN DEFAULT 1 NOT NULL,
    FOREIGN KEY (id_almacen) REFERENCES Almacenes(id_almacen),
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

-- ______________________________________________________________________________________________________________________

-- DATOS PARA INGRESAR A LA BASE DE DATOS.
-- Insertar en el orden en que estan. 

-- Insertar 4 tipos de documentos
    INSERT INTO tipos_documentos (tipo_documento)
    VALUES
        ('CC'),
        ('CE'),
        ('PA'),
        ('NIT');

-- Insertar 26 permisos
    INSERT INTO Permisos (nombre_permiso)
    VALUES
        ('Ver Inverios'),
        ('Crear Inventarios'),
        ('Editar Inventarios'),
        ('Eliminar Inventarios'),
        ('Ingresar a Inventarios'),
        ('Ver Operaciones'),
        ('Crear Entradas'),
        ('Crear Salidas'),
        ('Ver Stock'),
        ('Crear Productos'),
        ('Eliminar Productos'),
        ('Ver Detalles del Producto'),
        ('Ver movimientos del Producto'),
        ('Editar Detalles del Producto'),
        ('Ver Categorias'),
        ('Crear Categorias'),
        ('Editar Categorias'),
        ('Eliminar Categorias'),        
        ('Ver Abastecimiento'),
        ('Ver Informes'),
        ('Elegir Informes'),
        ('Ver Perfiles'),
        ('Crear Perfiles'),
        ('Editar Perfiles'),
        ('Eliminar Perfiles')

-- Insertar 3 roles
    INSERT INTO Roles (nombre_rol)
    VALUES
        ('Administrador'),
        ('Analista'),
        ('Almacenista')

-- Insertar x roles_permisos
    INSERT INTO Roles_Permisos (id_rol, id_permiso)
    VALUES
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (1, 5),
        (1, 6),
        (1, 7),
        (1, 8),
        (1, 9),
        (1, 10),
        (1, 11),
        (1, 12),
        (1, 13),
        (1, 14),
        (1, 15),
        (1, 16),
        (1, 17),
        (1, 18),
        (1, 19),
        (1, 20),
        (1, 21),
        (1, 22),
        (1, 23),
        (1, 24),
        (1, 25),
        (2, 1),
        (2, 5),
        (2, 6),
        (2, 9),
        (2, 13),
        (2, 19),
        (2, 20),
        (2, 21),
        (3, 1),
        (3, 5),
        (3, 6),
        (3, 7),
        (3, 8),
        (3, 9),
        (3, 12),
        (3, 13),
        (3, 15),
        (3, 19)

-- Insertar 4 categoría
    INSERT INTO Categorias (nombre_categoria)
    VALUES
        ('Aseo'),
        ('Tecnologia'),
        ('Ropa'),
        ('Comida');

-- Insertar 30 productos
    INSERT INTO productos (nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria)
    VALUES
        ('Jabón en polvo', 10, 21000, 35000, 'image1.jpg', 1),
        ('Smartphone', 15, 28000, 45500, 'image2.jpg', 2),
        ('Televisor LED', 20, 35000, 52500, 'image3.jpg', 2),
        ('Laptop', 5, 14000, 28000, 'image4.jpg', 2),
        ('Leche en polvo', 12, 24500, 42000, 'image5.jpg', 4),
        ('Zapatos deportivos', 8, 17500, 31500, 'image6.jpg', 3),
        ('Camisa de vestir', 18, 31500, 49000, 'image7.jpg', 3),
        ('Detergente líquido', 25, 38500, 59500, 'image8.jpg', 1),
        ('Cereal de desayuno', 3, 10450, 24450, 'image9.jpg', 4),
        ('Gorra de moda', 7, 17500, 31500, 'image10.jpg', 3),
        ('Toalla de baño', 10, 21000, 35000, 'image11.jpg', 3),
        ('Reloj de pulsera', 15, 28000, 45500, 'image12.jpg', 3),
        ('Cámara digital', 20, 35000, 52500, 'image13.jpg', 2),
        ('Auriculares inalámbricos', 5, 14000, 28000, 'image14.jpg', 2),
        ('Botella de agua', 12, 24500, 42000, 'image15.jpg', 4),
        ('Pantalones casuales', 8, 17500, 31500, 'image16.jpg', 3),
        ('Xbox', 18, 31500, 49000, 'image17.jpg', 2),
        ('Desinfectante', 25, 38500, 59500, 'image18.jpg', 1),
        ('Decodificador', 3, 10450, 24450, 'image19.jpg', 2),
        ('Salchichas', 7, 17500, 31500, 'image20.jpg', 4),
        ('Suavitel', 10, 21000, 35000, 'image21.jpg', 1),
        ('Clorox', 15, 28000, 45500, 'image22.jpg', 1),
        ('Cafe', 20, 35000, 52500, 'image23.jpg', 4),
        ('Smartwatch', 5, 14000, 28000, 'image24.jpg', 2),
        ('Ropa interior', 12, 24500, 42000, 'image25.jpg', 3),
        ('Fabuloso', 8, 17500, 31500, 'image26.jpg', 1),
        ('Juego de sábanas', 18, 31500, 49000, 'image27.jpg', 3),
        ('Pan', 25, 38500, 59500, 'image28.jpg', 4),
        ('Cartera', 3, 10450, 24450, 'image29.jpg', 3),
        ('Limpia vidrios', 7, 17500, 31500, 'image30.jpg', 1);

-- Insertar 6 usuarios
    INSERT INTO Usuarios (nombre_usuario, id_rol, id_tipo_documento, numero_documento, correo_electronico, contraseña)
    VALUES
        ('User1', 1, 1, 123456789, 'user1@example.com', 'password1'),
        ('User2', 2, 2, 987654321, 'user2@example.com', 'password2'),
        ('User3', 3, 2, 456789123, 'user3@example.com', 'password3'),
        ('User4', 3, 3, 321654987, 'user4@example.com', 'password4'),
        ('User5', 2, 1, 789123456, 'user5@example.com', 'password5'),
        ('User6', 2, 1, 654987321, 'user6@example.com', 'password6');

-- Insertar 3 almacenes
    INSERT INTO Almacenes (nombre_almacen, direccion_almacen, descripcion_almacen)
    VALUES
        ('Almacen A', 'Dirección A', 'Descripción A'),
        ('Almacen B', 'Dirección B', 'Descripción B'),
        ('Almacen C', 'Dirección C', 'Descripción C');

-- Insertar 6 almacenes_usuarios
    INSERT INTO Almacenes_Usuarios (id_almacen, id_usuario)
    VALUES
        (1, 1),
        (2, 2),
        (3, 3),
        (1, 4),
        (2, 5),
        (3, 6);

-- Insertar 30 entradas  
    INSERT INTO Entradas (fecha_hora, origen_entrada, id_almacen)
    VALUES
        ('2024-03-07', 'Origen 1', 1),
        ('2024-03-08', 'Origen 2', 2),
        ('2024-03-09', 'Origen 3', 3),
        ('2024-03-10', 'Origen 1', 1),
        ('2024-03-11', 'Origen 2', 2),
        ('2024-03-12', 'Origen 3', 3),
        ('2024-03-13', 'Origen 1', 1),
        ('2024-03-14', 'Origen 2', 2),
        ('2024-03-15', 'Origen 3', 3),
        ('2024-03-16', 'Origen 1', 1),
        ('2024-03-17', 'Origen 2', 2),
        ('2024-03-18', 'Origen 3', 3),
        ('2024-03-19', 'Origen 1', 1),
        ('2024-03-20', 'Origen 2', 2),
        ('2024-03-21', 'Origen 3', 3),
        ('2024-03-22', 'Origen 1', 1),
        ('2024-03-23', 'Origen 2', 2),
        ('2024-03-24', 'Origen 3', 3),
        ('2024-03-25', 'Origen 1', 1),
        ('2024-03-26', 'Origen 2', 2),
        ('2024-03-27', 'Origen 3', 3),
        ('2024-03-28', 'Origen 1', 1),
        ('2024-03-29', 'Origen 2', 2),
        ('2024-03-30', 'Origen 3', 3),
        ('2024-03-31', 'Origen 1', 1),
        ('2024-04-01', 'Origen 2', 2),
        ('2024-04-02', 'Origen 3', 3),
        ('2024-04-03', 'Origen 1', 1),
        ('2024-04-04', 'Origen 2', 2),
        ('2024-04-05', 'Origen 3', 3);

-- Insertar 30 salidas
    INSERT INTO Salidas (fecha_hora, destino_salida, id_almacen)
    VALUES
        ('2024-03-07', 'Destino 1', 1),
        ('2024-03-08', 'Destino 2', 2),
        ('2024-03-09', 'Destino 3', 3),
        ('2024-03-10', 'Destino 1', 1),
        ('2024-03-11', 'Destino 2', 2),
        ('2024-03-12', 'Destino 3', 3),
        ('2024-03-13', 'Destino 1', 1),
        ('2024-03-14', 'Destino 2', 2),
        ('2024-03-15', 'Destino 3', 3),
        ('2024-03-16', 'Destino 1', 1),
        ('2024-03-17', 'Destino 2', 2),
        ('2024-03-18', 'Destino 3', 3),
        ('2024-03-19', 'Destino 1', 1),
        ('2024-03-20', 'Destino 2', 2),
        ('2024-03-21', 'Destino 3', 3),
        ('2024-03-22', 'Destino 1', 1),
        ('2024-03-23', 'Destino 2', 2),
        ('2024-03-24', 'Destino 3', 3),
        ('2024-03-25', 'Destino 1', 1),
        ('2024-03-26', 'Destino 2', 2),
        ('2024-03-27', 'Destino 3', 3),
        ('2024-03-28', 'Destino 1', 1),
        ('2024-03-29', 'Destino 2', 2),
        ('2024-03-30', 'Destino 3', 3),
        ('2024-03-31', 'Destino 1', 1),
        ('2024-04-01', 'Destino 2', 2),
        ('2024-04-02', 'Destino 3', 3),
        ('2024-04-03', 'Destino 1', 1),
        ('2024-04-04', 'Destino 2', 2),
        ('2024-04-05', 'Destino 3', 3);

-- Insertar 30 productos_entradas
    INSERT INTO Productos_entradas (id_producto, id_entrada, cantidad_entrada, precio_compra)
    VALUES
        (1, 1, 10, 21000),
        (2, 2, 15, 28000),
        (3, 3, 20, 35000),
        (4, 4, 15, 14000),
        (5, 5, 12, 24500),
        (6, 6, 20, 17500),
        (7, 7, 21, 31500),
        (8, 8, 22, 38500),
        (9, 9, 30, 10450),
        (10, 10, 29, 17500),
        (11, 11, 19, 21000),
        (12, 12, 25, 28000),
        (13, 13, 24, 35000),
        (14, 14, 21, 14000),
        (15, 15, 22, 24500),
        (16, 16, 28, 17500),
        (17, 17, 18, 31500),
        (18, 18, 25, 38500),
        (19, 19, 30, 10450),
        (20, 20, 27, 17500),
        (21, 21, 10, 21000),
        (22, 22, 15, 28000),
        (23, 23, 20, 35000),
        (24, 24, 15, 14000),
        (25, 25, 12, 24500),
        (26, 26, 28, 17500),
        (27, 27, 18, 31500),
        (28, 28, 25, 38500),
        (29, 29, 30, 10450),
        (30, 30, 27, 17500);

-- Insertar 30 productos_salidas
    INSERT INTO Productos_Salidas (id_producto, id_salida, cantidad_salida)
    VALUES
        (1, 1, 2),
        (2, 2, 3),
        (3, 3, 5),
        (4, 4, 1),
        (5, 5, 3),
        (6, 6, 2),
        (7, 7, 3),
        (8, 8, 5),
        (9, 9, 2),
        (10, 10, 4),
        (11, 11, 6),
        (12, 12, 5),
        (13, 13, 4),
        (14, 14, 6),
        (15, 15, 2),
        (16, 16, 4),
        (17, 17, 8),
        (18, 18, 10),
        (19, 19, 1),
        (20, 20, 3),
        (21, 21, 4),
        (22, 22, 5),
        (23, 23, 6),
        (24, 24, 2),
        (25, 25, 5),
        (26, 26, 3),
        (27, 27, 6),
        (28, 28, 8),
        (29, 29, 1),
        (30, 30, 3);

-- Insertar 30 almacenes_productos
    INSERT INTO Almacenes_Productos (id_almacen, id_producto, referencia_producto, cantidad_producto_almacen)
    VALUES
        (1, 1, 'REF001', 10),
        (2, 2, 'REF002', 15),
        (3, 3, 'REF003', 20),
        (1, 4, 'REF004', 5),
        (2, 5, 'REF005', 12),
        (3, 6, 'REF006', 8),
        (1, 7, 'REF007', 18),
        (2, 8, 'REF008', 25),
        (3, 9, 'REF009', 3),
        (1, 10, 'REF010', 7),
        (2, 11, 'REF011', 10),
        (3, 12, 'REF012', 15),
        (1, 13, 'REF013', 20),
        (2, 14, 'REF014', 5),
        (3, 15, 'REF015', 12),
        (1, 16, 'REF016', 8),
        (2, 17, 'REF017', 18),
        (3, 18, 'REF018', 25),
        (1, 19, 'REF019', 3),
        (2, 20, 'REF020', 7),
        (3, 21, 'REF021', 10),
        (1, 22, 'REF022', 15),
        (2, 23, 'REF023', 20),
        (3, 24, 'REF024', 5),
        (1, 25, 'REF025', 12),
        (2, 26, 'REF026', 8),
        (3, 27, 'REF027', 18),
        (1, 28, 'REF028', 25),
        (2, 29, 'REF029', 3),
        (3, 30, 'REF030', 7);

-- Insertar 9 almacenes_categorias
    INSERT INTO Almacenes_Categorias (id_almacen, id_categoria)
    VALUES
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (2, 1),
        (2, 2),
        (2, 3),
        (2, 4),
        (3, 1),
        (3, 2),
        (3, 3),
        (3, 4);

-- ______________________________________________________________________________________________________________________

--Entidad Usuarios

    --Vista Registro de usuario/perfil

        --Consulta para mostrar los tipos de documentos
        SELECT * FROM tipos_documentos;

        --Consulta para el registro de un nuevo usuario haciendo click al boton registrar
        SELECT COUNT(*) AS datos_existentes FROM usuarios 
        WHERE correo_electronico = ? OR numero_documento = ?;

        INSERT INTO Usuarios (nombre_completo, tipo_documento, numero_documento, correo_electronico, contraseña, rol)
            VALUES ('?', '?', ?, '?', '?','?');

    --Vista Igreso o Logeo de usuario
        --Consulta para el ingreso/logeo del usuario haciendo click al boton ingreso
        SELECT * FROM usuarios
        WHERE correo_electronico = '?' AND contraseña = '?';
       
    --Vista Perfiles

        --Consulta para crear un perfil
        SELECT COUNT(*) AS datos_existentes FROM usuarios
        WHERE correo_electronico = ? OR numero_documento = ?;

        INSERT INTO usuarios (nombre_usuario, id_rol, tipo_documento, numero_documento, correo_electronico, contraseña) VALUES
        (?,?,?,?,?,?)

        --Consulta editar un perfil
        UPDATE usuarios
        SET nombre_usuario = ?, id_rol = ?
        WHERE id_usuario = ?
        
        --Consulta para eliminar un perfil
        UPDATE usuarios
        SET estado = 0
        WHERE id_usuario = ?

        --Consulta para mostrar los perfiles
        SELECT nombre_usuario, correo_electronico, nombre_rol FROM usuarios 
        JOIN roles ON usuarios.id_rol = roles.id_rol 
        WHERE usuarios.id_rol != 1
    
    --Vista Ajustes del Usuario
        --Consulta para mostrar datos del usuario
        SELECT nombre_usuario, tipo_documento, numero_documento, correo_electronico, contraseña FROM usuarios
        WHERE id_usuario = ?

        --Consulta para editar usuario
        UPDATE usuarios
        SET nombre_completo = ?, tipo_documento = ?, numero_documento = ?, correo_electronico = ?, contraseña = ?
        WHERE id_usuario = ?

--Entidad Almacenes

    --Vista Mis Inventarios vacio
        --Consulta para crear un nuevo inventario
        INSERT INTO Almacenes (nombre_almacen, direccion_almacen, descripcion_almacen)
        VALUES (?, ?, ?)

        --Consulta para asignar un almacen
        INSERT INTO almacenes_usuarios (id_usuario, id_almacen)
        VALUES (?, ?)

    --Vista Mis Inventarios
        --Consulta para mostrar los inventarios
        SELECT nombre_almacen, direccion_almacen, descripcion_almacen FROM almacenes
        WHERE id_almacen = ?

        --Consulta para eliminar un inventario
        DELETE FROM almacenes
        WHERE id_almacen = ?
    
    --Vista Editar Inventario
        --Consulta para editar un inventario
        UPDATE almacenes
        SET nombre_almacen = ?
        SET direccion_almacen = ?
        SET descripcion_almacen = ?
        WHERE id_almacen = ?

--Entidad Productos

    --Vista Stock
        --Consulta para crea un producto nuevo
        SELECT COUNT(*) AS datos_existentes FROM almacenes_productos
        JOIN productos ON almacenes_productos.id_producto = productos.id_producto
        WHERE (nombre_producto = ? OR referencia_producto = ?) AND id_almacen = ?;

        INSERT INTO productos(nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria) VALUES
        (?,?,?,?,?,?)

        INSERT INTO almacenes_productos(id_almacen, id_producto, referencia_producto, cantidad_producto_almacen) VALUES
        (?,?,?,?)

        --Consulta para mostrar la tabla de Stock
        SELECT productos.id_producto, nombre_producto, referencia_producto, nombre_categoria, cantidad_producto_almacen AS cantidad_disponeble 
        FROM Productos
        JOIN categorias ON productos.id_categoria = categorias.id_categoria
        JOIN almacenes_productos ON productos.id_producto = almacenes_productos.id_producto
        WHERE almacenes_productos.id_almacen = ? AND estado_producto_almacen = 1

        --Consulta para eliminar un producto
        UPDATE almacenes_productos
        SET estado_producto_almacen = 0
        WHERE id_producto = ? AND id_almacen = ?

    --Vista Detalles del Producto

        --Consulta para detalles del producto al dar click en Detalles del Producto
        SELECT nombre_producto, referencia_producto, nombre_categoria, nombre_almacen AS 'Ubicacion', cantidad_producto_almacen AS 'Cantidad', stock_minimo, promedio_costo AS 'Costo', precio_venta 'Precio', imagen FROM Productos 
        JOIN Almacenes_Productos ON Productos.id_producto = Almacenes_Productos.id_producto
        JOIN Almacenes ON Almacenes_Productos.id_almacen = Almacenes.id_almacen
        JOIN categorias ON Productos.id_categoria = categorias.id_categoria
        WHERE productos.id_producto = ? AND Almacenes.id_almacen = ?

        --Consulta actualizacion datos del producto al editarlo y guardar cambios
        UPDATE Productos
        SET nombre_producto = ?
            stock_minimo = ?
            precio_venta = ?
            imagen = ?
            id_categoria = ?
        WHERE id_producto = ?

    --Vista Movimientos del Producto
        --Consulta para movimientos producto, al dar click en Movimientos del Producto
        SELECT  CONCAT( 'ENT ', entradas.id_entrada ) AS 'Referencia', fecha_hora, nombre_almacen AS 'Origen', destino_entrada AS 'Destino'
        FROM entradas
        JOIN productos_entradas ON entradas.id_entrada = productos_entradas.id_entrada
        JOIN almacenes ON entradas.id_almacen = almacenes.id_almacen
        WHERE productos_entradas.id_producto = ?
        UNION ALL -- Se utiliza UNION ALL para incluir todas las filas y permitir duplicados
        SELECT  CONCAT( 'SAL ' ,salidas.id_salida ) AS 'Referencia', fecha_hora, nombre_almacen AS 'Origen', destino_salida AS 'Destino'
        FROM salidas
        JOIN productos_salidas ON salidas.id_salida = productos_salidas.id_salida
        JOIN almacenes ON salidas.id_almacen = almacenes.id_almacen
        WHERE productos_salidas.id_producto = ?;

    --Vista Abastecimiento
       --Consulta para mostrar stock minimo al dar click en stock minimo
        SELECT nombre_producto, referencia_producto, stock_minimo, cantidad_producto_almacen FROM productos
        JOIN almacenes_productos ON productos.id_producto = almacenes_productos.id_producto
        WHERE cantidad_producto_almacen <= stock_minimo;

--Entidad Categorias
        
    --Vista Categorias vacia
        --Consulta para crear una categoria
        SELECT COUNT(*) AS datos_existentes FROM almacenes_categorias
        JOIN categorias ON almacenes_categorias.id_categoria = categorias.id_categoria
        WHERE nombre_categoria = ? AND id_almacen = ?;

        INSERT INTO categorias(nombre_categoria) VALUES
        (?)

        INSERT INTO almacenes_categorias(id_almacen, id_categoria) VALUES
        (?,?)

    --Vista Categorias
        --Consulta para mostrar las categorias
        SELECT categorias.id_categoria, nombre_categoria FROM categorias
        JOIN almacenes_categorias ON categorias.id_categoria = almacenes_categorias.id_categoria
        WHERE id_almacen = ?

        --Consulta para eliminar una categoria
        UPDATE almacenes_categorias
        SET estado_categoria_almacen = 0
        WHERE id_categoria = ? and id_almacen = ?

    --Vista Editar Categoria
        --Consulta para editar una categoria
        UPDATE categorias
        SET nombre_categoria = ?
        WHERE id_categoria = ?

--Entidad Movimientos

    --Vista Operaciones
        --Consulta para mostrar movimientos del dia
        SELECT CONCAT('ENT', entradas.id_entrada) AS referencia, fecha_hora, nombre_producto, nombre_almacen AS origen, destino_entrada AS destino, CONCAT('+',cantidad_entrada) AS cantidad
        FROM entradas 
        JOIN Productos_entradas ON entradas.id_entrada = Productos_entradas.id_entrada 
        JOIN Productos ON Productos_entradas.id_producto = Productos.id_producto
        JOIN almacenes ON almacenes.id_almacen = entradas.id_almacen
        WHERE fecha_hora > "2024-03-07" AND fecha_hora < "2024-04-05"
        UNION
        SELECT CONCAT('SAL', salidas.id_salida) AS referencia, fecha_hora, nombre_producto, nombre_almacen AS origen, destino_salida AS destino, CONCAT('-',cantidad_salida) AS cantidad 
        FROM salidas 
        JOIN productos_salidas ON salidas.id_salida = productos_salidas.id_salida 
        JOIN Productos ON productos_salidas.id_producto = Productos.id_producto 
        JOIN almacenes ON almacenes.id_almacen = salidas.id_almacen
        WHERE fecha_hora > "2024-03-07" AND fecha_hora < "2024-04-05";

    --Vista Crear Entrada
        --Consulta para crear una entrada
        INSERT INTO entradas(fecha, origen_entrada, id_almacen) VALUES (?,?,?)

        INSERT INTO productos_entradas(id_producto, id_entrada, cantidad_entrada, precio_compra) VALUES
        (?,?,?,?)

        UPDATE almacenes_productos SET cantidad_producto_almacen = cantidad_producto_almacen + ? WHERE id_producto = ? AND id_almacen = ?

    --Vista Crear Salida
        --Consulta para crear una salida        
        INSERT INTO salidas(fecha, destino_salida, id_almacen) VALUES
        (?,?,?)

        INSERT INTO productos_salidas(id_producto, id_salida, cantidad_salida) VALUES
        (?,?,?)

        UPDATE almacenes_productos SET cantidad_producto_almacen = cantidad_producto_almacen - ? WHERE id_producto = ? AND id_almacen = ?

--Entidad Informes
    --Vista Informes
        --Consulta para Informe/Salidas x Producto en Tiempo
        SELECT productos.id_producto, cantidad_salida FROM productos_salidas
        JOIN productos ON productos_salidas.id_producto = productos.id_producto
        JOIN salidas ON productos_salidas.id_salida = salidas.id_salida
        WHERE productos.id_producto = 3 AND fecha_hora >= ? AND fecha_hora < ?

        --Consulta para Informe/Productos mas vendidos por almacen
        SELECT P.id_producto, nombre_producto, cantidad_salida FROM productos_salidas AS PS
        JOIN productos AS P ON PS.id_producto = P.id_producto
        JOIN salidas AS S ON PS.id_salida = S.id_salida
        WHERE id_almacen = 1 And S.fecha_hora >= '2024-02-21' AND S.fecha_hora <= '2024-02-23' 
        ORDER BY cantidad_salida DESC
        LIMIT 1

        --Consulta para Informe/Movimiento por Producto en almacenes
        SELECT almacenes.id_almacen, nombre_almacen, cantidad_salida FROM productos_salidas
        JOIN salidas ON productos_salidas.id_salida = salidas.id_salida
        JOIN almacenes ON salidas.id_almacen = almacenes.id_almacen
        WHERE id_producto = 3 AND fecha_hora >= ? AND fecha_hora <= ?

