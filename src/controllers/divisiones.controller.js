import { getConection, sql } from '../database/conection';
import { HTTP_STATUS, MESSAGES } from '../database/status';

export const getDivisiones = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT * FROM Divisiones;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createDivison = async (req, res) => {
    const { nombre} =  req.body;

    if (nombre) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .query('INSERT INTO Division (nombre) VALUES (@nombre);');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST,  content: { "nombre": nombre }
        });
    }     
};

export const getDivisionById = async (req, res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('id',id)
            .query('SELECT * FROM Division WHERE id = @id;');

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

export const deleteDivisionById = async (req,res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .query('DELETE FROM Divison WHERE id = @id;');

            return res.status(HTTP_STATUS.DELETE_SUCCES);   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};


export const updateDivisonById = async (req, res) => {
    const { nombre } =  req.body;
    const { id } = req.params;
    if (id && nombre) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .input('nombre', sql.VarChar, nombre)
            .query('UPDATE Division SET nombre = @nombre WHERE id = @id;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content:{
                "id": id,
                "nombre": nombre
            }
        });
    } 
};