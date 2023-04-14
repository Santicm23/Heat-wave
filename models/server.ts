
import express, { Application } from 'express';


class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
    }

    routes() {
        this.app.use('/app/cuentas', );
        this.app.use('/app/hashtags', );
    }
}