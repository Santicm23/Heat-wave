
import { NextFunction, Request, Response } from "express";


export const validateUser = async(req: Request, res: Response, next: NextFunction) => {

    const { username } = req.params;
    const { logged_account } = req.body;

    if (logged_account.id_role !== 1 && logged_account.username !== username)
        return res.status(401).json({
            msg: 'Un usuario solo puede alterar la información de su propia cuenta'
        });
    
    next();
}

export const validateAdmin = async(req: Request, res: Response, next: NextFunction) => {

    const { logged_account } = req.body;

    if (logged_account.id_role !== 1)
        return res.status(401).json({
            msg: 'Esta acción solo puede ser realizada por un administrador'
        });
    
    next();
}