import { Router } from "express";
import { getDivisiones, getDivisionById, createDivison, updateDivisonById, deleteDivisionById } from "../controllers/divisiones.controller";

const router = Router()

router.get('/division/get', getDivisiones);
router.get('/division/getbid/:id', getDivisionById);
router.post('/division/getbid/', createDivison);
router.put('/division/update/:id', updateDivisonById);
router.delete('/division/delete/:id', deleteDivisionById);

export default router