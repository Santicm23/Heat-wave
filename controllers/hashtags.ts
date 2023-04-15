
import { Request, Response } from 'express';


export const getHashtags = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Hashtags'
    });
}

export const getHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Hashtag'
    });
}

export const postHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Crear Hashtag'
    });
}

export const putHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Modificar Hashtag'
    });
}

export const deleteHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Eliminar Hashtag'
    });
}