
import { Request, Response } from 'express';


export const getAccounts = (req: Request, res: Response) => {
    res.json({
        msg: 'Pedir cuentas'
    }) 
}

export const getAccount = (req: Request, res: Response) => {
    const { id } = req.params;

    res.json({
        msg: 'Pedir cuenta',
        id
    }) 
}

export const postAccount = (req: Request, res: Response) => {
    res.json({
        msg: 'Crear cuenta'
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