
import { Request, Response } from 'express';

import Account from '../models/accounts';


export const getAccounts = async(req: Request, res: Response) => {
    const accounts = await Account.findAll({
        attributes: ['username', 'name', 'email', 'password', 'image'],
        where: {
            active: true
        }
    });

    res.json({
        msg: `${accounts.length} cuentas encontradas`,
        accounts
    });
}

export const getAccount = async(req: Request, res: Response) => {
    const { id } = req.params;
    const account = await Account.findByPk(id);

    if (account == null){
        res.json({
            msg: `No existe una cuenta con el username: ${id}`
        })
    } else{
        res.json({
            attributes: ['username', 'name', 'email', 'password', 'image'],
            where: {
                active: true
            }
        })
    }
}

export const postAccount = async(req: Request, res: Response) => {

    const { body } = req;

    const account = new Account(body);
    await account.save();

    res.json({
        msg: 'Cuenta creada exitosamente',
        account
    }) 
}

export const putAccount = (req: Request, res: Response) => {
    res.json({
        msg: 'Modificar cuenta'
    }) 
}

export const deleteAccount = (req: Request, res: Response) => {
    res.json({
        msg: 'Eliminar cuenta'
    }) 
}