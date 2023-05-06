
import { Request, Response } from 'express';

import Account from '../models/account';
import { username_not_exists, something_went_wrong } from '../helpers/json-errors';
import Role from '../models/role';



export const getAccounts = async(req: Request, res: Response) => {

    try {
        
        let accounts = await Account.findAll({
            where: {
                active: true
            },
            include: {
                attributes: ['name'],
                model: Role
            }
        });

        accounts = accounts.map((account: any) => account.getRepr(account.Role.name))

        if (accounts.length == 1) {
            res.json({
                msg: `1 cuenta encontrada`,
                accounts
            });
        } else {
            res.json({
                msg: `${accounts.length} cuentas encontradas`,
                accounts
            });
        }


    } catch (error) {
        console.error(error);

        res.status(500).json(something_went_wrong(error));
    }

    
}

export const getAccount = async(req: Request, res: Response) => {
    const { username } = req.params;

    try {
        
        const account = await Account.findByPk(username);

        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));

        return res.json({
            msg: 'Cuenta encontrada exitosamente',
            account: await account.getFullRepr()
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }

}

export const postAccount = async(req: Request, res: Response) => {
    const { body } = req;

    try {

        if (body.role) {
            body.id_role = (await Role.findOne({ where: { name: body.role } }))?.id_role;
        }
        
        const account = await Account.create(body);

        return res.json({
            msg: 'Cuenta creada exitosamente',
            account: await account.getFullRepr()
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}

export const putAccount = async(req: Request, res: Response) => {
    const { username } = req.params;
    const { name, password, image } = req.body;
    
    try {
        
        const account = await Account.findByPk(username);

        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));
        
        await account.update({
            name,
            password,
            image
        });
    
        return res.json({
            msg: 'Cuenta actualizada exitosamente',
            account: account.getRepr()
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}

export const deleteAccount = async(req: Request, res: Response) => {
    const { username } = req.params;

    try {
        
        const account = await Account.findByPk(username);

        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));
        
        await account.update({
            active: false
        });
    
        return res.json({
            msg: 'Cuenta eliminada exitosamente',
            account: account.getRepr()
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}