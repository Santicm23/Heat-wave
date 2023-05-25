
import 'dotenv/config';

import Server from './models/server';


export const server = new Server();

server.listen();