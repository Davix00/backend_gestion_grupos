import { config } from 'dotenv'
config();

export default {
    port: process.env.PORT || 3000, //configuramos el puerto que se usara
    dbUser: process.env.USER || '',
    dbPassword: process.env.PASSWORD || '',
    dbServer: process.env.SERVER || '',
    dbName: process.env.DATABASE || ''
};
