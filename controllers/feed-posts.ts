
import { Request, Response } from 'express';
import { uploadFile } from '../helpers/upload-file';


export const getFeedPosts = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Publicaciones'
    });
}

export const getFeedPost = (req: Request, res: Response) => {
    res.json({
        msg:'Pedir Publicacion'
    });
}

export const postFeedPost = async(req: Request, res: Response) => {

    try {
        // await uploadFile(soundFile, ['wav', 'mp3', 'flac'], 'sounds');

        // if (imageFile) {
        //     await uploadFile(imageFile as UploadedFile, ['png', 'jpg', 'jpeg', 'gif'], 'images');
        // }
    
        res.json({
            msg: 'Publicacion creada correctamente',
        });

    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }
}

export const putFeedPost = (req: Request, res: Response) => {
    res.json({
        msg:'Modificar Publicacion'
    });
}

export const deleteFeedPost = (req: Request, res: Response) => {
    res.json({
        msg:'Eliminar Publicacion'
    });
}