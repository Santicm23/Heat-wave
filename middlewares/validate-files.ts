
import { NextFunction, Request, Response } from 'express';


const validateFileToUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No se envió ningún archivo'
        });
    } else if (!req.files.image || !req.files.sound) {
        return res.status(400).json({
            msg: 'No se enviaron los archivos requeridos (image, sound)'
        });
    }

    next();
}


module.exports = {
    validateFileToUpload
}