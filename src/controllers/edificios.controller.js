import { getConection, sql } from '../database/conection';
import { HTTP_STATUS, MESSAGES} from '../database/status'

export const getEdificos = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT e.IDedificio, e.NombreEdificio, e.DescripcionEdif, e.DivisionID, d.NombreDivision  FROM Edificios AS e LEFT JOIN Divisiones AS d ON e.DivisionID = d.IDdivision;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createEdificio = async (req, res) => {
    const { nombre, descripcion, idDivision} =  req.body;

    if (nombre && descripcion && idDivision) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .input('idDivision', sql.Int, idDivision)
            .query('INSERT INTO Edificios (NombreEdificio, DescripcionEdif, DivisionID) VALUES (@nombre, @descripcion, @idDivision);');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS}); 
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST,  content: { 
                "nombre": nombre,
                "descripcion": descripcion,
                "idDivision": idDivision
            }
        });
    }     
};

export const getEdificiosById = async (req, res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('id',id)
            .query('SELECT e.IDedificio, e.NombreEdificio, e.DescripcionEdif, e.DivisionID, d.NombreDivision  FROM Edificios AS e LEFT JOIN Divisiones AS d ON e.DivisionID = d.IDdivision WHERE IDedificio = @id;');

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

export const deleteEdificioById = async (req,res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .query('DELETE FROM Edificios WHERE IDedificio = @id;');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};


export const updateEdificioById = async (req, res) => {
    const { nombre, descripcion, idDivision } =  req.body;
    const { id } = req.params;
    if (id && nombre, descripcion, idDivision) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('id', sql.Int, id)
            .input('idDivision', sql.Int, idDivision)
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .query('UPDATE Edificios SET NombreEdificio = @nombre, DescripcionEdif = @descripcion, DivisionID = @idDivision WHERE IDedificio = @id;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content:{
                "id": id,
                "idDivision": idDivision,
                "nombre": nombre,
                "descripcion": descripcion
            }
        });
    } 
};