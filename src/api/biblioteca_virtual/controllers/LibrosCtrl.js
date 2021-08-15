const mysqlConnection = require('../../../config/db');
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'biblioteca',//process.env.CLOUDINARY_CLOUD_NAME,
    api_key: '115534691848563',//process.env.CLOUDINARY_API_KEY,
    api_secret: 'mGMXCsq-U0R9LGAYQ8W8xCxPrLw'//process.env.CLOUDINARY_API_SECRET
});

exports.obtenerBitacora = async (req, res) => {
    
    const query = 'SELECT * FROM `tbl_bitacora`;';

    try {
        const bitacora = await mysqlConnection.query(query);
        return res.json(bitacora);
    } catch (error) {
        console.log(error);
    }
} 


exports.obtenerLibros = async (req, res) => {
    
    const query = 'CALL sp_sel_libro;';

    try {
        const libros = await mysqlConnection.query(query);
        return res.json(libros['0']);
    } catch (error) {
        console.log(error);
    }
} 

exports.obtenerLibroPorId = async (req, res) => {
    
    const {id} = req.params;
    const query = 'CALL sp_sel_libro_id(?)';

    try {
        const result = await mysqlConnection.query(query, [id]);
        return res.json(result);
    } catch (error) {
        console.log(error);
    }
}

exports.agregarLibro = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, PDF_NEW, PUBLIC_ID, PUBLIC_IDPDF, IDIOMA, NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO} = req.body;
    
        const query = `CALL sp_ins_libro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    try {
        const result = await mysqlConnection.query(query,[ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, PDF_NEW, PUBLIC_ID, PUBLIC_IDPDF, IDIOMA, NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO]);
        return res.json({Status: 'Libro Agregado'});
    } catch (error) {
        console.log(error);
    }

}

exports.actualizarLibro = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    
    const {ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, PDF_NEW, PUBLIC_ID, PUBLIC_IDPDF, IDIOMA, 
        NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, 
        NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO} = req.body;
    
    const{id} = req.params;
    
    const query = 'CALL sp_actu_libro(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    try {
        const result = await mysqlConnection.query(query, [id, ISBN, TITULO, EDICION, DESCRIPCION_LIBRO, IMG, PDF_NEW, PUBLIC_ID, PUBLIC_IDPDF, IDIOMA, NOMBRE_EDITORIAL, NOMBRE_CATEGORIA, DESCRIPCION, NOMBRE_AUTOR, NACIONALIDAD, PREMIOS, RANKING, USR_REGISTRO]);
        return res.json({Status: 'Libro Actualizado'});
    } catch (error) {
        console.log(error);
    }
}

exports.eliminarLibro = async (req, res) => {
    
    const {USR_REGISTRO} = req.body;
    const {id} = req.params;
    //const query = 'CALL sp_del_libro(?, ?)';

    try {
        //eliminar en el servidor de cloudinary
        const foto = await mysqlConnection.query('select `public_id` from tbl_libros where id_libro =(?)',[id]);
        let imagen = foto[0].public_id;
        if (!imagen =="") {
            await cloudinary.uploader.destroy(imagen); 
        }

        const result = await mysqlConnection.query('CALL sp_del_libro(?, ?)', [id, USR_REGISTRO]);
        return res.json({Status: 'Libro Eliminado'});
    } catch (error) {
        console.log(error);
    }
}




