import { Router } from "express";
import { getAulas, getAulaById, createAula, updateAulaById, deleteAulaById } from "../controllers/aulas.controller";

const router = Router()

router.get('/aulas/get', getAulas);
router.get('/aulas/getbid/:id', getAulaById);
router.post('/aulas/create/', createAula);
router.put('/aulas/update/:id', updateAulaById);
router.delete('/aulas/delete/:id', deleteAulaById);

export default router