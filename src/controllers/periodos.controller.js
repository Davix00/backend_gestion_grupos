import { getConection, sql } from '../database/conection';
import { HTTP_STATUS, MESSAGES } from '../database/status';

export const getPeriodos = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT * FROM Periodos;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createPeriodo = async (req, res) => {
    const { nombre, fechaInicio, fechaFin, anio} =  req.body;

    if (nombre && fechaInicio && fechaFin && anio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('fechaInicio', sql.Date, fechaInicio)
            .input('fechaFin', sql.Date, fechaFin)
            .input('anio', sql.Int, anio)
            .query('INSERT INTO Periodos (NombrePeriodo, P_inicio, P_Fin, Año) VALUES (@nombre, @fechaInicio, @fechaFin, @anio);');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST,  content: { 
                "nombre": nombre,
                "fechaInicio": descripcion,
                "fechaFin": idDivision,
                "anio": anio
            }
        });
    }     
};

export const getPerodioById = async (req, res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('id',id)
            .query('SELECT * FROM Periodos WHERE IDperiodo = @id;');

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

export const deletePeriodoById = async (req,res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .query('DELETE FROM Periodos WHERE IDperiodo = @id;');

            return res.status(HTTP_STATUS.DELETE_SUCCES);   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};

export const updatePeriodoById = async (req, res) => {
    const { nombre, fechaInicio, fechaFin, anio } =  req.body;
    const { id } = req.params;
    if (id && nombre && fechaInicio && fechaFin && anio) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar, nombre)
            .input('fechaInicio', sql.Date, fechaInicio)
            .input('fechaFin', sql.Date, fechaFin)
            .input('anio', sql.Int, anio)
            .query('UPDATE Periodos SET NombrePeriodo = @nombre, P_inicio = @fechaInicio, P_Fin = @fechaFin, Año = @anio WHERE IDperiodo = @id;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content:{
                "id": id,
                "nombre": nombre,
                "fechaInicio": fechaInicio,
                "fechaFin": fechaFin,
                "anio": anio
            }
        });
    } 
};