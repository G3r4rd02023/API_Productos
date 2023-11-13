const mysql = require("mysql")

const express = require("express");

var app = express();

const bp = require("body-parser")

app.use(bp.json());

var mysqlconnection = mysql.createConnection({
    host : 'localhost',
    port: 3306,
    user :'root',
    password:'g3r4rd0',
    database:'api_productos',
    multipleStatements : true
});

//prueba de conexion a bd 
mysqlconnection.connect((err)=>{
    if(!err){
        console.log('Conexion Exitosa');        
    } else {
        console.log('Error al conectar a la BD');
        console.log(err);
    }
});

//ejecutar el servidor en el puerto especifico
app.listen(3000,()=>console.log('Server running puerto:3000'));

//api_productos

//crear un producto

app.post('/productos', (req, res) => {
    let producto = req.body;
    var sql = "SET @p_codigoBarra=?; \
               SET @p_nombre=?; \
               SET @p_categoria=?; \
               SET @p_marca=?; \
               SET @p_precio=?; \
               \
               CALL SP_CrearProducto(@p_codigoBarra, @p_nombre, @p_categoria, @p_marca, @p_precio);";
               mysqlconnection.query(sql, [producto.CodigoBarra, producto.Nombre, producto.Categoria, producto.Marca, producto.Precio], (err, rows, fields) => {
        if (!err) {
            res.send("Ingresado correctamente !!");
        } else {
            console.log(err);
        }
    });
});

//editar un producto

app.put('/productos/:IdProducto', (req, res) => {
    const {
        CodigoBarra,
        Nombre,
        Categoria,
        Marca,
        Precio,        
    } = req.body;
    const {
        IdProducto
    } = req.params;
    mysqlconnection.query(
        "CALL sp_EditarProducto(?, ?, ?, ?, ?, ?)",
        [IdProducto, CodigoBarra, Nombre, Categoria, Marca, Precio],
        (err, rows, fields) => {
            if (!err) {
                //retornar lo actualizado
                res.status(200).json(req.body);
            } else {
                console.log(err);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
});

//eliminar un producto

app.delete('/productos/:IdProducto', (req, res) => {
    const { IdProducto } = req.params;

    mysqlconnection.query('CALL sp_EliminarProducto(?)', [IdProducto], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        } else {
            console.log(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
});

//lista de productos

app.get('/productos', (req, res) => {    
    mysqlconnection.query('call sp_ListarProductos()', (err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// buscar un producto

app.get('/productos/:IdProducto', (req, res) => {
    const {IdProducto } = req.params;
    mysqlconnection.query('CALL sp_VerProducto(?)', [IdProducto],(err, rows, fields) => {
        if (!err) {
            res.status(200).json(rows[0]);
        } else {
            console.log(err);
        }
    });
});