
import cors from 'cors';
import express, { Application } from 'express';

import publicacionesRouter from '../routes/posts'

import cuentasRouter from '../routes/accounts';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        auth: '/auth',
        accounts: '/acounts',
        posts: '/publicaciones'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares(); // configuraciones

        this.routes();      // fijar rutas
    }

    public middlewares() : void {
        this.app.use(cors());                   // para seguridad y compatibilidad con el navegador

        this.app.use(express.json());           // para el uso de json (rest API)

        this.app.use(express.static('public')); // para el despliegue del front end en la carpeta 'public'
    }

    public routes() : void {
        this.app.use(this.paths.accounts, cuentasRouter);                // ruta cuentas
        this.app.use(this.paths.posts, publicacionesRouter);    // ruta hashtags
    }

    public listen() : void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}


export default Server;
