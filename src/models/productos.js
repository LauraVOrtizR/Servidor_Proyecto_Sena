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

module.exports = Producto;