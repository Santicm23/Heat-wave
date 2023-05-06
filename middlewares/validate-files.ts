
import { NextFunction, Request, Response } from 'express';


export const validateFileToUpload = (req: Request, res: Response, next: NextFunction) => {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return res.status(400).json({
    //         msg: 'No se envió ningún archivo'
    //     });
    // } else if (!req.files.sound) {
    //     return res.status(400).json({
    //         msg: 'No se envio el archivo requerido (sound)'
    //     });
    // }

    next();
}