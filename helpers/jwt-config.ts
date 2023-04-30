
import { Request } from 'express';
import jwt, { Secret } from 'jsonwebtoken';


const SECRETORPRIVATEKEY: Secret = process.env.SECRETORPRIVATEKEY || '';

export interface CustomRequest extends Request {
    authAccount: string
}

export const generateJWT = (username: string) => {
    return new Promise((resolve, reject) => {

        const payload = {
            username
        };

        jwt.sign(payload, SECRETORPRIVATEKEY, {expiresIn: '4h'},
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token);
                }
            }
        );
    });
}