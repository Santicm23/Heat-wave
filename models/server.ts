
import cors from 'cors';
import express, { Application } from 'express';
import favicon from 'serve-favicon';

import accountsRouter from '../routes/accounts';
import mysql from '../db/mysql';
import authRouter from '../routes/auth';
import feedPostsRouter from '../routes/feed-posts';
import songsRouter from '../routes/songs';
import mongo from '../db/mongo';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        auth: '/auth',
        accounts: '/accounts',
        posts: '/posts',
        posts_feed: '/posts/feed',
        songs: '/songs'
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
    }

    public routes() : void {
        this.app.use(this.paths.accounts, accountsRouter);              // ruta cuentas
        this.app.use(this.paths.auth, authRouter);                      // ruta autentificación
        this.app.use(this.paths.songs, songsRouter);                    // ruta posts de feed
        this.app.use(this.paths.posts_feed, feedPostsRouter);           // ruta posts de feed
    }

    public listen() : void {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    async dbConnection() : Promise<void> {
        try {
            
            await mysql.authenticate();
            console.log('Base de Datos MySQL conectada');
            await mongo.authenticate();
            console.log('Base de datos MongoDB conectada');
            
        } catch (error: string | any) {
            console.error(
                `Error conectandose a la base de datos de MySQL:\n
                    '${error}'`
            );
        }
    }
}


export default Server;
