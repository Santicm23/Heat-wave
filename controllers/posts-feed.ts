
import { Request, Response } from 'express';


export const getPosts = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Publicaciones'
    });
}

export const getPost = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Publicacion'
    });
}

export const postPost = (req: Request, res: Response) => {
    res.json({
        msg:'Crear Publicacion'
    });
}

export const putPost = (req: Request, res: Response) => {
    res.json({
        msg:'Modificar Publicacion'
    });
}

export const deletePost = (req: Request, res: Response) => {
    res.json({
        msg:'Eliminar Publicacion'
    });
}