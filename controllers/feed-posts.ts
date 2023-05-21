
import { Readable } from 'stream';

import { Request, Response } from 'express';

import multer from 'multer';
import { GridFSBucket, ObjectId } from 'mongodb';

import mongo from '../db/mongo';
import Account from '../models/account';
import FeedPost from '../models/feedPost';
import { something_went_wrong, username_not_exists } from '../helpers/json-errors';


export const getAllFeedPosts = async (req: Request, res: Response) => {

    try {

        const feedposts = await FeedPost.findAll();

        return res.json({
            msg: `${feedposts.length} posts encontrados`,
            feedposts
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }

}

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
    const { username, id_feed_post } = req.params;

    try {

        const feedpost = await FeedPost.findAll({
            where: {
                username,
                id_feed_post: id_feed_post
            }
        });

        if(!feedpost){
            return res.status(404).json({msg: 'Post no encontrado'});
        }

        return res.json({
            msg: 'Post encontrada',
            feedpost
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}

export const getImageFeedPost = async(req: Request, res: Response) => {

    const { id_feed_post } = req.params;

    const feedPost = await FeedPost.findByPk(id_feed_post);

    if (!feedPost) {
        return res.status(404).json({
            msg: `La publicacion con id '${id_feed_post}' no existe`
        });
    }

    if (!feedPost.image)
        return res.status(404).json({
            msg: `Esta publicacion no tiene foto`
        });

    const id = new ObjectId(feedPost.image);

    // res.set('content-type', 'image/png');
    res.set('accept-ranges', 'bytes');

    const bucket = new GridFSBucket(mongo.db, {
        bucketName: 'images'
    });

    const downloadStream = bucket.openDownloadStream(id);

    downloadStream.on('data', (chunk: any) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.status(404).json({
            msg: 'No se encontró la foto de perfil'
        });
    });

    downloadStream.on('end', () => {
        res.end();
    });
}

export const postFeedPost = async(req: Request, res: Response) => {

    const { username, id_song } = req.params;
    const { description, location, likes } = req.query;

    const account = await Account.findByPk(username);
    
    if (!account || !account.active)
        return res.status(404).json(username_not_exists(username));
    
    const storage = multer.memoryStorage();

    const upload = multer({storage, limits: {
        fields: 2, // 1 non-file field
        fileSize: 9000000, // 9mb maximum size
        files: 1, // maximum 1 file
        parts: 3 // files + fields
    }});

    upload.single('image')(req, res, async(err) => {
        if (err) 
            return res.status(400).json({
                msg: err.message
            });

        if (!req.file) {
            const feedPost = await FeedPost.create({
                username,
                id_song: Number(id_song),
                description: description as string | undefined,
                location: location as string | undefined,
                likes: Number(likes)
            });

            return res.status(201).json({
                msg: `Publicacion creada correctamente`,
                feedPost
            });
        }
        
        // convert buffer to readable stream
        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        const bucket = new GridFSBucket(mongo.db, {
            bucketName: 'images'
        });

        const uploadStream = bucket.openUploadStream(username as string);
        const id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        const feedPost = await FeedPost.create({
            username,
            id_song: Number(id_song),
            description: description as string | undefined,
            location: location as string | undefined,
            likes: Number(likes),
            image: id.toString()
        });
        
        uploadStream.on('error', () => {
            return res.status(500).json({
                msg: 'Error uploading file'
            });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({
                msg: `Publicacion creada correctamente`,
                feedPost
            });
        });

    });
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