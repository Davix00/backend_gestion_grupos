import { getConection, sql } from '../database/conection';
import { HTTP_STATUS, MESSAGES } from '../database/status';

export const getEspecialidades = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT e.IDespecialidad, e.NombresEspecialidad, e.DescripcionEsp, e.DivisionID, d.NombreDivision FROM Especialidades AS e LEFT JOIN Divisiones AS d ON e.DivisionID =  d.IDdivision;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createEspecialidad = async (req, res) => {
    const { nombre, descripcion, idDivision} =  req.body;

    if (nombre && descripcion && idDivision) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .input('idDivision', sql.Int, idDivision)
            .query('INSERT INTO Especialidades (NombresEspecialidad, DescripcionEsp, DivisionID) VALUES (@nombre, @descripcion, @idDivision);');
        
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

export const getEspecialidadById = async (req, res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('id',id)
            .query('SELECT e.IDespecialidad, e.NombresEspecialidad, e.DescripcionEsp, e.DivisionID, d.NombreDivision FROM Especialidades AS e LEFT JOIN Divisiones AS d ON e.DivisionID =  d.IDdivision WHERE IDespecialidad = @id;');

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

export const deleteEspecialidadById = async (req,res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .query('DELETE FROM Especialidades WHERE IDespecialidad = @id;');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});    
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};


export const updateEspecialidadById = async (req, res) => {
    const { nombre, descripcion, idDivision } =  req.body;
    const { id } = req.params;
    if (id && nombre && descripcion && idDivision) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('id', sql.Int, id)
            .input('idDivision', sql.Int, idDivision)
            .input('nombre', sql.VarChar, nombre)
            .input('descripcion', sql.VarChar, descripcion)
            .query('UPDATE Especialidades SET NombresEspecialidad = @nombre, DescripcionEsp = @descripcion, DivisionID = @idDivision WHERE IDespecialidad = @id;');
            
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