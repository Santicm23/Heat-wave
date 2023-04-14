
import express, { Application } from 'express';



import cuentasRouter from "../routes/cuentas";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
    }

    routes() {
        this.app.use('/app/cuentas', cuentasRouter);
        this.app.use('/app/hashtags', );
    }    
}