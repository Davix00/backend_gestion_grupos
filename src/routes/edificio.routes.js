import { Router } from "express"
import { getEdificos, getEdificiosById, createEdificio, updateEdificioById, deleteEdificioById } from "../controllers/edificios.controller"

const router = Router()

router.get('/edificio/get', getEdificos);
router.get('/edificio/getbid/:id', getEdificiosById);
router.post('/edificio/create/', createEdificio);
router.put('/edificio/update/:id', updateEdificioById);
router.delete('/edificio/delete/:id', deleteEdificioById);

export default router