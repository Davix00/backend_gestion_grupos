import express from "express";
import config from "./config";
import cors from 'cors';

// importamos las rutas apis
import divisonRoutes from './routes/division.routes'
import edificioRoutes from './routes/edificio.routes'

const app = express()

//settings
app.set('port',config.port)

//middlewarse
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) //permitimos el llamado de nuestras apis de cualquier parte

// instanciamos las rutas 
app.use(divisonRoutes)
app.use(edificioRoutes)

export default app