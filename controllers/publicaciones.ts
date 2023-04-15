
import { Request, Response } from 'express';


export const getPublicaciones = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Publicaciones'
    });
}

export const getPublicacion = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Publicacion'
    });
}

export const postPublicacion = (req: Request, res: Response) => {
    res.json({
        msg:'Crear Publicacion'
    });
}

export const putPublicacion = (req: Request, res: Response) => {
    res.json({
        msg:'Modificar Publicacion'
    });
}

export const deletePublicacion = (req: Request, res: Response) => {
    res.json({
        msg:'Eliminar Publicacion'
    });
}