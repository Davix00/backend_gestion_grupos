import { getConection, sql } from "../database/conection";
import { HTTP_STATUS, MESSAGES } from "../database/status";

export const getAulas = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT a.IDaula, a.NombreAula, a.DescripcionAula, a.EdificioID, e.NombreEdificio FROM Aulas AS a LEFT JOIN Edificios AS e ON a.EdificioID = e.IDedificio;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createAula = async (req, res) => {
    const { nombre, descripcion, idEdificio} =  req.body;

    if (nombre && descripcion && idEdificio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .input('idEdificio', sql.Int, idEdificio)
            .query('INSERT INTO Aulas (NombreAula, DescripcionAula, EdificioID) VALUES (@nombre, @descripcion, @idEdificio);');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST,  content: { 
                "nombre": nombre,
                "descripcion": descripcion,
                "idEdificio": idEdificio
            }
        });
    }     
};

export const getAulaById = async (req, res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('id',id)
            .query('SELECT a.IDaula, a.NombreAula, a.DescripcionAula, a.EdificioID, e.NombreEdificio FROM Aulas AS a LEFT JOIN Edificios AS e ON a.EdificioID = e.IDedificio WHERE IDaula = @id;');

            if(result.recordset[0]){
                return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset[0]});   
            }
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};

export const deleteAulaById = async (req,res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .query('DELETE FROM Aulas WHERE IDaula = @id;');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};


export const updateAulaById = async (req, res) => {
    const { nombre, descripcion, idEdificio } =  req.body;
    const { id } = req.params;
    if (id && nombre, descripcion, idEdificio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('id', sql.Int, id)
            .input('idEdificio', sql.Int, idEdificio)
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .query('UPDATE Aulas SET NombreAula = @nombre, DescripcionAula = @descripcion, EdificioID = @idEdificio WHERE IDaula = @id;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content:{
                "id": id,
                "idEdificio": idEdificio,
                "nombre": nombre,
                "descripcion": descripcion
            }
        });
    } 
};