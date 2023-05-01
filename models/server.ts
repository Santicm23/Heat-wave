
import cors from 'cors';
import express, { Application } from 'express';

import accountsRouter from '../routes/accounts';
import db from '../db/connection';
import postsRouter from '../routes/posts';
import authRouter from '../routes/auth';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        auth: '/auth',
        accounts: '/accounts',
        posts: '/publicaciones'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares(); // configuraciones

        this.routes();      // fijar rutas

        this.dbConnection();
    }

    public middlewares() : void {
        this.app.use(cors());                   // para seguridad y compatibilidad con el navegador

        this.app.use(express.json());           // para el uso de json (rest API)

        this.app.use(express.static('public')); // para el despliegue del front end en la carpeta 'public'
    }

    public routes() : void {
        this.app.use(this.paths.accounts, accountsRouter);              // ruta cuentas
        this.app.use(this.paths.posts, postsRouter);                    // ruta hashtags
        this.app.use(this.paths.auth, authRouter);                      // ruta autentificación
    }

    public listen() : void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    async dbConnection() : Promise<void> {
        try {
            
            await db.authenticate();
            console.log('Base de Datos conectados');
            
        } catch (error: string | any) {
            console.error(
                `Error conectandose a la base de datos:\n
                    '${error}'`
            );
        }
    }
}


export default Server;
