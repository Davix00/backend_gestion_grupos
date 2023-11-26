import { Router } from "express"
import { getEspecialidades, getEspecialidadById, createEspecialidad, deleteEspecialidadById, updateEspecialidadById } from "../controllers/especialidades.controller"

const router = Router()

router.get('/especialidades/get', getEspecialidades);
router.get('/especialidades/getbid/:id', getEspecialidadById);
router.post('/especialidades/create/', createEspecialidad);
router.put('/especialidades/update/:id', updateEspecialidadById);
router.delete('/especialidades/delete/:id', deleteEspecialidadById);

export default router