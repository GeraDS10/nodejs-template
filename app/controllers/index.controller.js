const { Pool } = require('pg');

const pool = new Pool({
    host: 'ep-tight-wood-a5ww0pyt.us-east-2.aws.neon.fl0.io',
    user: 'fl0user',
    password: 'rl6HNjVDG4km',
    database: 'pgapi',
    port: 5432,
    ssl: {
        // Asegura la conexión utilizando SSL
        rejectUnauthorized: false,
        // Establece el modo SSL a 'require'
        sslmode: 'require'
    }
});

//Método para obtener todos los perros
const getPerros = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM perros');

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron perros' });
        }

        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener perros:', error);
        res.status(500).json({ message: 'Hubo un error al obtener los perros' });
    }
};

//Método para obtener un perro por su ID
const getPerroById = async (req, res) => {
    try {
        const id = req.params.id;
        const queryString = 'SELECT * FROM perros WHERE id = $1';
        const queryValues = [id];
        const response = await pool.query(queryString, queryValues);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró ningún perro con el ID proporcionado' });
        }

        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener perro por ID:', error);
        res.status(500).json({ message: 'Hubo un error al obtener el perro por ID' });
    }
};

//Método para obtener un perro por su nombre
const getPerroByNombre = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const queryString = 'SELECT * FROM perros WHERE nombre = $1';
        const queryValues = [nombre];
        const response = await pool.query(queryString, queryValues);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró ningún perro con el nombre proporcionado' });
        }

        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener perro por nombre:', error);
        res.status(500).json({ message: 'Hubo un error al obtener el perro por nombre' });
    }
};

//Método para agregar un perro nuevo
const createPerros = async (req, res) => {
    const { nombre, nombreDuenio, nombreDuenia, telefonoDuenio, telefonoDuenia, direccion, raza, pelajeLargo, observaciones } = req.body;

    const queryString = 'INSERT INTO perros (nombre, nombreDuenio, nombreDuenia, telefonoDuenio, telefonoDuenia, direccion, raza, pelajeLargo, observaciones) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const queryValues = [nombre, nombreDuenio, nombreDuenia, telefonoDuenio, telefonoDuenia, direccion, raza, pelajeLargo, observaciones];
    try {
        const response = await pool.query(queryString, queryValues);
        res.json({
            message: "Perro agregado satisfactoriamente",
            body: {
                perro: {nombre, nombreDuenio, nombreDuenia, telefonoDuenio, telefonoDuenia, direccion, raza, pelajeLargo, observaciones}
            }
        })
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    }
    
};

// Método para eliminar un perro por su ID
const deletePerro = async (req, res) => {
    try {
        const id = req.params.id;
        const queryString = 'DELETE FROM perros WHERE id = $1';
        const queryValues = [id];
        const response = await pool.query(queryString, queryValues);

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontró ningún perro con el ID proporcionado' });
        }

        res.status(200).json({ message: 'Perro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar perro por ID:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar el perro por ID' });
    }
};



//Metodo para obtener estadias
const getEstadias = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM estadias');

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estadias' });
        }

        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener estadias:', error);
        res.status(500).json({ message: 'Hubo un error al obtener las estadias' });
    }
};

//Metodo para obtener estadia por ID
const getEstadiaById = async (req, res) => {
    try {
        const id = req.params.id;
        const queryString = 'SELECT * FROM estadias WHERE id = $1';
        const queryValues = [id];
        const response = await pool.query(queryString, queryValues);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna estadia con el ID proporcionado' });
        }

        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener estadia por ID:', error);
        res.status(500).json({ message: 'Hubo un error al obtener la estadia por ID' });
    }
};

//Método para agregar nueva estadia
const createEstadias = async (req,res) => {
    const { fechaIngreso, fechaEgreso, valorEstadia, observaciones, idPerro } = req.body;

    const queryString = 'INSERT INTO estadias (fechaIngreso, fechaEgreso, valorEstadia, observaciones, idPerro) VALUES ($1, $2, $3, $4, $5)';
    const queryValues = [ fechaIngreso, fechaEgreso, valorEstadia, observaciones, idPerro];

    try {
        const response = await pool.query(queryString, queryValues);
        res.json({
            message: "Estadia agregada satisfactoriamente",
            body: {
                estadia: {fechaIngreso, fechaEgreso, valorEstadia, observaciones, idPerro}
            }
        })
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).send('Error interno del servidor');
    }

};

// Método para eliminar una estadia por su ID
const deleteEstadia = async (req, res) => {
    try {
        const id = req.params.id;
        const queryString = 'DELETE FROM estadias WHERE id = $1';
        const queryValues = [id];
        const response = await pool.query(queryString, queryValues);

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna estadia con el ID proporcionado' });
        }

        res.status(200).json({ message: 'Estadia eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar estadia por ID:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar la estadia por ID' });
    }
};

//Metodo para obtener peluquerias
const getPeluquerias = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM peluquerias');

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron peluquerías' });
        }

        res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al obtener peluquerías:', error);
        res.status(500).json({ message: 'Hubo un error al obtener las peluquerías' });
    }
};

// Método para obtener una peluquería por su ID
const getPeluqueriaById = async (req, res) => {
    try {
        const id = req.params.id;
        const queryString = 'SELECT * FROM peluquerias WHERE id = $1';
        const queryValues = [id];
        const response = await pool.query(queryString, queryValues);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna peluquería con el ID proporcionado' });
        }

        res.status(200).json(response.rows[0]);
    } catch (error) {
        console.error('Error al obtener peluquería por ID:', error);
        res.status(500).json({ message: 'Hubo un error al obtener la peluquería por ID' });
    }
};

// Método para crear una nueva peluquería
const createPeluquerias = async (req, res) => {
    try {
        const { fecha, nombre, raza, alergico, traslado, corte, banio, valor, observaciones, idPerro } = req.body;
        const queryString = 'INSERT INTO peluquerias (fecha, nombre, raza, alergico, traslado, corte, banio, valor, observaciones, idPerro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const queryValues = [fecha, nombre, raza, alergico, traslado, corte, banio, valor, observaciones, idPerro];
        await pool.query(queryString, queryValues);
        res.status(201).json({ message: "Peluqueria agregada satisfactoriamente",
        body: {
            peluqueria: {fecha, nombre, raza, alergico, traslado, corte, banio, valor, observaciones, idPerro}
        } });
    } catch (error) {
        console.error('Error al crear peluquería:', error);
        res.status(500).json({ message: 'Hubo un error al crear la peluquería' });
    }
};

// Método para eliminar una peluquería por su ID
const deletePeluqueria = async (req, res) => {
    try {
        const id = req.params.id;
        const queryString = 'DELETE FROM peluquerias WHERE id = $1';
        const queryValues = [id];
        const response = await pool.query(queryString, queryValues);

        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'No se encontró ninguna peluquería con el ID proporcionado' });
        }

        res.status(200).json({ message: 'Peluquería eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar peluquería por ID:', error);
        res.status(500).json({ message: 'Hubo un error al eliminar la peluquería por ID' });
    }
};

module.exports = {
    getPerros,
    createPerros,
    getPerroById,
    getPerroByNombre,
    deletePerro,

    getEstadias,
    createEstadias,
    getEstadiaById,
    deleteEstadia,
    
    getPeluquerias,
    createPeluquerias,
    getPeluqueriaById,
    deletePeluqueria
}