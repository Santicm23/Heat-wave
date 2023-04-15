
import { Request, Response } from 'express';


export const getHashtags = (req: Request, res: Response) => {
    res.json({
        msg:'Pediste Hashtags'
    });
}

export const getHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Pediste Hashtag'
    });
}

export const postHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Creando Hashtag'
    });
}

export const putHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Modificando Hashtag'
    });
}

export const deleteHashtag = (req: Request, res: Response) => {
    res.json({
        msg:'Borrando Hashtag'
    });
}