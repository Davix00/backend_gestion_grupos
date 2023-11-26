import { Router } from "express";
import { getPeriodos, getPerodioById, createPeriodo, updatePeriodoById, deletePeriodoById  } from "../controllers/periodos.controller";

const router = Router()

router.get('/periodo/get', getPeriodos);
router.get('/periodo/getbid/:id', getPerodioById);
router.post('/periodo/create/', createPeriodo);
router.put('/periodo/update/:id', updatePeriodoById);
router.delete('/periodo/delete/:id', deletePeriodoById);

export default router