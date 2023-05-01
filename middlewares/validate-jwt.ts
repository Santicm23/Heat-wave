
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import Account from '../models/accounts';
import { username_not_exists } from '../helpers/json-errors';


const SECRETORPRIVATEKEY: Secret = process.env.SECRETORPRIVATEKEY || '';

const validateJWT = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token');
    
    if (!token) {
        return res.status(400).json({
            msg: 'No se mando ningún token'
        });
    }

    try {
        const { username } = jwt.verify(token, SECRETORPRIVATEKEY) as JwtPayload;

        const account = await Account.findByPk(username);

        if (!account || !account.active) 
            throw new Error(username_not_exists(username).msg);
        
        req.body.account = account;

        next();
    } catch (error) {
        res.status(401).json({
            msg: 'token no válido',
            error
        })
    }  
}


export default validateJWT;