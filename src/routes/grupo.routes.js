import { Router } from "express";
import { getGrupos, getGrupoById, createGrupo, updateGrupoById, deleteGrupoById  } from "../controllers/grupos.controller";

const router = Router()

router.get('/grupo/get', getGrupos);
router.get('/grupo/getbid/:id', getGrupoById);
router.post('/grupo/create/', createGrupo);
router.put('/grupo/update/:id', updateGrupoById);
router.delete('/grupo/delete/:id', deleteGrupoById);

export default router