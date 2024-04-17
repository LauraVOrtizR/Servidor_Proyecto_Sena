const db = require( '../config/config' ); // Traer la configuracion de la base de datos
const Producto = {}; // Crear el objeto Producto

Producto.create = ( producto, result ) => {
    const sql = `SELECT COUNT(*) AS datos_existentes FROM almacenes_productos
                JOIN productos ON almacenes_productos.id_producto = productos.id_producto 
                WHERE nombre_producto = ? OR referencia_producto = ?;`; // Consulta para verificar si el producto ya existe
    db.query( // Ejecutar la consulta
        sql,
        [
            producto.nombre_producto,
            producto.referencia_producto
        ],
        ( err, res ) => {
            if( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }
            else{
                console.log( 'Datos existentes: ', res[0] );
                if( res[0].datos_existentes > 0 ) {
                    result( null, { message: 'El producto ya existe' } );
                }
                else {
                    const sql = `INSERT INTO productos(referencia_producto, nombre_producto, stock_minimo, promedio_costo, precio_venta, imagen, id_categoria) 
                                VALUES (?,?,?,?,?,?,?)`; // Consulta para insertar un producto
                    db.query(
                        sql,
                        [
                            producto.referencia_producto,
                            producto.nombre_producto,
                            producto.stock_minimo,
                            producto.promedio_costo,
                            producto.precio_venta,
                            producto.imagen, 
                            producto.id_categoria
                        ],
                        ( err, res ) => {
                            if( err ) {
                                console.log( 'error: ', err );
                                result( err, null );
                            }
                            else{
                                console.log( 'Id del nuevo producto: ', res.insertId );
                                result( null, res.insertId, { message: 'Producto creado' } );
                            }
                        }
                    )
                }
            }
        }
    )
}

Producto.read = ( result ) => {
    const sql = `SELECT nombre_producto, referencia_producto, nombre_categoria, cantidad_producto_almacen AS cantidad_disponible
    FROM Productos
    JOIN categorias ON productos.id_categoria = categorias.id_categoria 
    JOIN almacenes_productos ON productos.id_producto = almacenes_productos.id_producto`; // Consulta para leer todos los productos
    db.query(
        sql,
        [],
        ( err, res ) => {
            if( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }
            else{
                console.log( 'Datos del producto: ', res );
                result( null, res );
            }
        }
    )
}

Producto.delete = ( producto, result ) => {
    const sql = `UPDATE productos SET estado_producto = 0 WHERE id_producto = ?`;
    db.query(
        sql,
        [
            producto.id_producto
        ],
        ( err, res ) => {
            if( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }
            else{
                console.log( 'Id del producto eliminado: ', res );
                result( null, res, { message: 'Producto eliminado' } );
            }
        }
    )
}

Producto.readDetails = ( producto, result ) => {
    const sql = `SELECT nombre_producto, referencia_producto, nombre_almacen AS 'Ubicacion', cantidad_producto_almacen AS 'Cantidad', stock_minimo, promedio_costo AS 'Costo', precio_venta 'Precio', imagen FROM Productos
            JOIN Almacenes_Productos ON Productos.id_producto = Almacenes_Productos.id_producto
            JOIN Almacenes ON Almacenes_Productos.id_almacen = Almacenes.id_almacen
            WHERE productos.id_producto = ?`; // Consulta para leer los detalles de un producto
    db.query(
        sql,
        [
            producto.id_producto
        ],
        ( err, res ) => {
            if( err ) {
                console.log( 'error: ', err );
                result( err, null );
            }
            else{
                console.log( 'Datos del producto: ', res );
                result( null, res );
            }
        }
    )
}

module.exports = Producto;