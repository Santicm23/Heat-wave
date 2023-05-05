
import cors from 'cors';
import express, { Application } from 'express';
import favicon from 'serve-favicon';
import fileUpload from 'express-fileupload';

import accountsRouter from '../routes/accounts';
import db from '../db/connection';
import authRouter from '../routes/auth';
import postsFeedRouter from '../routes/posts-feed';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        auth: '/auth',
        accounts: '/accounts',
        posts: '/posts',
        posts_feed: '/posts/feed'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.middlewares(); // configuraciones

        this.routes();      // fijar rutas

        this.dbConnection();
    }

    public middlewares() : void {
        // para seguridad y compatibilidad con el navegador
        this.app.use(cors());                   

        // para el uso de json (rest API)
        this.app.use(express.json());           

        // para el despliegue del front end en la carpeta 'public'
        this.app.use(express.static('public'));

        // para el icono de la pestaña en la página web
        this.app.use(favicon('./public/favicon.ico'));

        // para permitir archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    public routes() : void {
        this.app.use(this.paths.accounts, accountsRouter);              // ruta cuentas
        this.app.use(this.paths.auth, authRouter);                      // ruta autentificación
        this.app.use(this.paths.posts_feed, postsFeedRouter);           // ruta posts de feed
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
