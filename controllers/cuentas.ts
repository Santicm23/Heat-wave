
import { Request, Response } from "express";


export const getCuentas = (req: Request, res: Response) => {
    res.json({
        msg: "Pedir cuentas"
    }) 
}

export const getCuenta = (req: Request, res: Response) => {
    res.json({
        msg: "Pedir cuenta"
    }) 
}

export const postCuenta = (req: Request, res: Response) => {
    res.json({
        msg: "Crear cuenta"
    }) 
}

export const putCuenta = (req: Request, res: Response) => {
    res.json({
        msg: "Modificar cuenta"
    }) 
}

export const deleteCuenta = (req: Request, res: Response) => {
    res.json({
        msg: "Eliminar cuenta"
    }) 
}

