
import { Request, Response } from 'express';
import { uploadFile } from '../helpers/upload-file';

import FeedPost from '../models/feedPost';
import Playlist from '../models/playlist';


export const getFeedPosts = async (req: Request, res: Response) => {
    
//TODO: Arreglar esta parte con el controlador playlists
    const { username } = req.params;

    const feedposts = await Playlist.findAll({
        where: {
            username: username
        },
        include: {
            attributes: ['name'],
            
        }
    });
    
    res.json({
        msg:'Pedir Publicaciones'
    });
}

export const getFeedPost = async (req: Request, res: Response) => {
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