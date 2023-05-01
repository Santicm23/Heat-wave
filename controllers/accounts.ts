
import { Request, Response } from 'express';

import Account from '../models/accounts';


const select = {
    attributes: ['username', 'name', 'email', 'password', 'image'],
    where: {
        active: true
    }
};

export const getAccounts = async(req: Request, res: Response) => {

    try {
        
        const accounts = await Account.findAll(select);

        if (accounts.length == 1)
            return res.json({
                msg: `1 cuenta encontrada`,
                accounts
            });

        return res.json({
            msg: `${accounts.length} cuentas encontradas`,
            accounts
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: `Algo salió mal: ${error}`
        });
    }

    
}

export const getAccount = async(req: Request, res: Response) => {
    const { username } = req.params;

    try {
        
        const account = await Account.findByPk(username, select);
        
        res.json({
            msg: 'Cuenta encontrada exitosamente',
            account
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: `Algo salió mal: ${error}`
        });
    }

}

export const postAccount = async(req: Request, res: Response) => {

    const { body } = req;

    try {
        
        const account = await Account.create(body);

        res.json({
            msg: 'Cuenta creada exitosamente',
            account
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: `Algo salió mal: ${error}`
        });
    }
}

export const putAccount = async(req: Request, res: Response) => {

    const { username } = req.params;
    const { name, password, image } = req.body;
    
    try {
        
        const account = await Account.findByPk(username);
        
        await account?.update({
            name,
            password,
            image
        });
    
        return res.json({
            msg: 'Cuenta actualizada exitosamente',
            account
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: `Algo salió mal: ${error}`
        });
    }
}

export const deleteAccount = async(req: Request, res: Response) => {

    const { username } = req.params;

    try {
        
        const account = await Account.findByPk(username);
        
        await account?.update({
            active: false
        });
    
        return res.json({
            msg: 'Cuenta eliminada exitosamente',
            account
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: `Algo salió mal: ${error}`
        });
    }
}