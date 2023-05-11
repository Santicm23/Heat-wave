
import { Readable } from 'stream';

import { Request, Response } from 'express';
import multer from 'multer';
import { ObjectId, GridFSBucket } from 'mongodb';

import mongo from '../db/mongo';
import Song from '../models/song';


export const getSongs = async(req: Request, res: Response) => {
    const songs = await Song.findAll();

    res.json({
        msg: `${songs.length} canciones encontradas`,
        songs
    });
}

export const getSong = async(req: Request, res: Response) => {
    
}

export const getTrack = (req: Request, res: Response) => {

    const id = new ObjectId(req.params.id);

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    const bucket = new GridFSBucket(mongo.db, {
        bucketName: 'sounds'
    });

    const downloadStream = bucket.openDownloadStream(id);

    downloadStream.on('data', (chunk: any) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.status(404).json({
            msg: 'No se encontró la canción'
        });
    });

    downloadStream.on('end', () => {
        res.end();
    });
}

export const uploadTrack = async(req: Request, res: Response) => {

    const { name, author, album } = req.query;

    const storage = multer.memoryStorage();

    const upload = multer({storage, limits: {
        fields: 2, // 1 non-file field
        fileSize: 9000000, // 9mb maximum size
        files: 1, // maximum 1 file
        parts: 3 // files + fields
    }});

    upload.single('track')(req, res, async(err) => {
        
        if (err) 
            return res.status(400).json({
                msg: err.message
            });

        // convert buffer to readable stream
        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file?.buffer);
        readableTrackStream.push(null);

        const bucket = new GridFSBucket(mongo.db, {
            bucketName: 'sounds'
        });

        const uploadStream = bucket.openUploadStream(name as string);
        const id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        const song = await Song.create({
            name: name as string,
            author: author as string,
            sound: id.toString(),
            album: album as string | undefined,
            duration: 0
        });

        uploadStream.on('error', () => {
            return res.status(500).json({
                msg: 'Error uploading file'
            });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({
                msg: `File uploaded successfully, stored under Mongo ObjectID: ${id}`,
                song
            });
        });

    });
}
