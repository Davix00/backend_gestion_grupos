import { getConection, sql } from '../database/conection';
import { HTTP_STATUS, MESSAGES } from '../database/status';

export const getGrupos = async (req, res) => {
    try {
        const pool = await getConection();

        const result = await pool.request()
        .query('SELECT g.IDgrupo, g.NombreGrupo, g.Cuatrimestre, g.PeriodoID ,p.NombrePeriodo, g.Turno, g.AulaID, a.NombreAula, g.EspecialidadID, e.NombresEspecialidad FROM Grupos as g LEFT JOIN Especialidades AS e ON g.EspecialidadID = e.IDespecialidad LEFT JOIN Aulas AS a ON g.AulaID = a.IDAula LEFT JOIN Periodos AS p ON g.PeriodoID = p.IDperiodo;');

        if (result.recordset){
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: result.recordset});
        }
        return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS, content: ''});
    } catch (error) {
        return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
    }
};

export const createGrupo = async (req, res) => {
    const { nombre, cuatrimestre, turno, idPeriodo, idEspecialidad, idAula} =  req.body;

    if (nombre && cuatrimestre && turno && idPeriodo && idEspecialidad && idAula) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('cuatrimestre', sql.Int, cuatrimestre)
            .input('turno', sql.VarChar, turno)
            .input('idPeriodo', sql.Int, idPeriodo)
            .input('idAula', sql.Int, idAula)
            .input('idEspecialidad', sql.Int, idEspecialidad)
            .query('INSERT INTO Grupos (NombreGrupo, Cuatrimestre, Turno, PeriodoID, AulaID, EspecialidadID) VALUES (@nombre, @cuatrimestre, @turno, @idPeriodo, @idAula, @idEspecialidad);');
        
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).
        json({msg: MESSAGES.BAD_REQUEST,  content: { 
                "nombre": nombre,
                "cuatrimestre": cuatrimestre,
                "turno": turno,
                "idPeriodo": idPeriodo,
                "idAula": idAula,
                "idEspecialidad": idEspecialidad
            }
        });
    }     
};

export const getGrupoById = async (req, res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            const result = await pool.request()
            .input('id',id)
            .query('SELECT g.IDgrupo, g.NombreGrupo, g.Cuatrimestre, g.PeriodoID ,p.NombrePeriodo, g.Turno, g.AulaID, a.NombreAula, g.EspecialidadID, e.NombresEspecialidad FROM Grupos as g LEFT JOIN Especialidades AS e ON g.EspecialidadID = e.IDespecialidad LEFT JOIN Aulas AS a ON g.AulaID = a.IDAula LEFT JOIN Periodos AS p ON g.PeriodoID = p.IDperiodo WHERE IDgrupo = @id;');

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

export const deleteGrupoById = async (req,res) => {
    const { id } =  req.params;
    if(id){
        try {
            const pool = await getConection();

            await pool.request()
            .input('id',id)
            .query('DELETE FROM Grupos WHERE IDgrupo = @id;');

            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});   
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR, error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({msg: MESSAGES.BAD_REQUEST, content: {"id": id || ''}});
    }
};

export const updateGrupoById = async (req, res) => {
    const { nombre, cuatrimestre, turno, idPeriodo, idEspecialidad, idAula } =  req.body;
    const { id } = req.params;
    if (id && nombre && cuatrimestre && turno && idPeriodo && idEspecialidad) {
        try {
            const pool = await getConection();

            await pool.request()
            .input('id', id)
            .input('nombre', sql.VarChar, nombre)
            .input('cuatrimestre', sql.Int, cuatrimestre)
            .input('turno', sql.VarChar, turno)
            .input('idPeriodo', sql.Int, idPeriodo)
            .input('idAula', sql.Int, idAula)
            .input('idEspecialidad', sql.Int, idEspecialidad)
            .query('UPDATE Grupos SET NombreGrupo = @nombre, Cuatrimestre = @cuatrimestre, Turno = @turno, PeriodoID = @idPeriodo, AulaID = @idAula, EspecialidadID = @idEspecialidad WHERE IDGrupo = @id;');
            
            return res.status(HTTP_STATUS.SUCCESS).json({msg: MESSAGES.SUCCESS});
        } catch (error) {
            return res.status(HTTP_STATUS.DATABASE_ERROR).json({msg: MESSAGES.DATABASE_ERROR,error});
        }
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST)
        .json({msg: MESSAGES.BAD_REQUEST, content:{
                "nombre": nombre,
                "cuatrimestre": cuatrimestre,
                "turno": turno,
                "idPeriodo": idPeriodo,
                "idAula": idAula,
                "idEspecialidad": idEspecialidad
            }
        });
    } 
};