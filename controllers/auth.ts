
import { Request, Response } from 'express';

import { generateJWT } from '../helpers/jwt-config';
import Account from '../models/account';
import { isPassword } from '../helpers/encrypt';


export const login = async(req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        
        let account;
        let error;
        if (username) {
            account = await Account.findByPk(username);
            error = 'El nombre de usuario o la contraseña no son correctos';
            
        } else {
            account = await Account.findOne({
                where: {
                    email
                }
            });
            error = 'El correo o la contraseña no son correctos';
            
        }
        
        if (!account || !account.active || !isPassword(password, account.password))
            return res.status(400).json({
                msg: error
            });
        

        const token = await generateJWT(account.username);

        return res.json({
            account: account.getRepr(),
            token
        });

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    }
}

export const renewToken = async(req: Request, res: Response) => {
    const { account } = req.body;

    const token = await generateJWT(account.id);

    res.json({
        account: account.getRepr(),
        token
    })
}