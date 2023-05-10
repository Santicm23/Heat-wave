
import { Request, Response } from 'express';

import Playlist from '../models/playlist';
import { something_went_wrong } from '../helpers/json-errors';


export const getPlaylists = async (req: Request, res: Response) => {
    
    const { username } = req.params;

    try{

        const playlists = await Playlist.findAll({
            where: {
                username
            }
        });

        res.json({
            msg: `${playlists.length} playlist(s) encontrada(s)`,
            playlists
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
        
}

export const getPlaylist = async (req: Request, res: Response) => {
    
    const { id_playlist } = req.params;

    try{

        const playlist = await Playlist.findByPk(id_playlist);
    
        res.json({
            msg:'Playlist encontrada exitosamente',
            playlist
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
    
}

export const postPlaylist = async(req: Request, res: Response) => {
    const { body } = req;
    
    res.json({
        msg: 'Post Playlist'
    });
}

export const putPlaylist = (req: Request, res: Response) => {
    res.json({
        msg:'Modificar Playlist'
    });
}

export const deletePlaylist = (req: Request, res: Response) => {
    res.json({
        msg:'Eliminar Playlist'
    });
}