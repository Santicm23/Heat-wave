
import cors from 'cors';
import express, { Application } from 'express';

import hashtagsRouter from '../routes/hashtags'



import cuentasRouter from "../routes/cuentas";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares(); // configuraciones

        this.routes();      // fijar rutas
    }

    middlewares() {
        this.app.use(cors());                   // para seguridad y compatibilidad con el navegador

        this.app.use(express.json());           // para el uso de json (rest API)

        this.app.use(express.static('public')); // para el despliegue del front end en la carpeta 'public'
    }

    routes() {
        this.app.use('/app/cuentas', cuentasRouter);        // ruta cuentas
        this.app.use('/app/hashtags', hashtagsRouter);      // ruta hashtags
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}


export default Server;
