
import { Request, Response } from 'express';

import FeedPost from '../models/feedPost';
import { something_went_wrong, username_not_exists } from '../helpers/json-errors';
import Song from '../models/song';
import Account from '../models/account';


export const getFeedPosts = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {

        const feedposts = await FeedPost.findAll({
            where: {
                username
            }
        });

        if(!feedposts){
            return res.status(404).json({msg: `Posts del usuario ${username} no encontrados`});
        }

        return res.json({
            msg: `${feedposts.length} posts encontrados`,
            feedposts
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }

}

export const getFeedPost = async (req: Request, res: Response) => {
    const { username, id } = req.params;

    try {

        const feedpost = await FeedPost.findAll({
            where: {
                username,
                id_feed_post: id
            }
        });

        if(!feedpost){
            return res.status(404).json({msg: 'Post no encontrado'});
        }

        return res.json({
            msg:'Post encontrados: ',
            feedpost
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}

export const postFeedPost = async(req: Request, res: Response) => {

    const { username } = req.params

    try {

        const account = await Account.findByPk(username);
        
        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));

        req.body.username = username;
        
        const feedPost = await FeedPost.create(req.body);

        res.json({
            msg: 'Publicacion creada correctamente'
        });

        console.log(req);

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

export const deleteFeedPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const feedpost = await FeedPost.findByPk(id);

        if(!feedpost){
            return res.status(404).json({msg: 'Post no encontrado'});
        }

        await feedpost.update({
            active: false
        })

        return res.json({
            msg:'Post elminado exitosamente',
            feedpost
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
    
    
    
}