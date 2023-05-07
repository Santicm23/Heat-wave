
import { Readable } from 'stream';

import { Request, Response } from 'express';
import multer from 'multer';
import { ObjectId, GridFSBucket } from 'mongodb';

import mongo from '../db/mongo';
import Song from '../models/song';



export const getTrack = (req: Request, res: Response) => {

    const id = new ObjectId(req.params.id);

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    const bucket = new GridFSBucket(mongo.db, {
        bucketName: 'tracks'
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

        const uploadStream = bucket.openUploadStream(req.body.name);
        const id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        req.body.sound = id.toString();
        req.body.duration = 0;

        const song = await Song.create(req.body);

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
