
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';


const SECRETORPRIVATEKEY: Secret = process.env.SECRETORPRIVATEKEY || '';

const validateJWT = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(400).json({
            msg: 'No se mando ningún token'
        });
    }

    try {
        const { uid } = jwt.verify(token, SECRETORPRIVATEKEY) as JwtPayload;

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'token no válido',
            error
        })
    }  
}


export default validateJWT;