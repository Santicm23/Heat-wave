
import { NextFunction, Request, Response } from 'express';


export const validateFileToUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({
            msg: 'No se envió ningún archivo'
        });
    }

    next();
}