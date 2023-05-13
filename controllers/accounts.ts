
import { Readable } from 'stream';

import { Request, Response } from 'express';
import multer from 'multer';
import { GridFSBucket, ObjectId } from 'mongodb';

import Account from '../models/account';
import { username_not_exists, something_went_wrong } from '../helpers/json-errors';
import Role from '../models/role';
import mongo from '../db/mongo';


export const getAccounts = async(req: Request, res: Response) => {

    try {
        
        let accounts = await Account.findAll({
            where: {
                active: true
            },
            include: {
                attributes: ['name'],
                model: Role
            }
        });

        accounts = accounts.map((account: any) => account.getRepr(account.Role.name))

        if (accounts.length == 1) {
            res.json({
                msg: `1 cuenta encontrada`,
                accounts
            });
        } else {
            res.json({
                msg: `${accounts.length} cuentas encontradas`,
                accounts
            });
        }


    } catch (error) {
        console.error(error);

        res.status(500).json(something_went_wrong(error));
    }

    
}

export const getAccount = async(req: Request, res: Response) => {
    const { username } = req.params;

    try {
        
        const account = await Account.findByPk(username);

        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));

        return res.json({
            msg: 'Cuenta encontrada exitosamente',
            account: await account.getFullRepr()
        });


    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }

}

export const getImageAccount = async(req: Request, res: Response) => {

    const { username } = req.params;

    const account = await Account.findByPk(username);

    if (!account) {
        return res.status(404).json({
            msg: `La cuenta con nombre de usuario '${username}' no existe`
        });
    }

    if (!account.image)
        return res.status(404).json({
            msg: `Esta cuenta no tiene foto de perfil`
        });

    const id = new ObjectId(account.image);

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

export const postAccount = async(req: Request, res: Response) => {
    const { body } = req;
    
    try {
        
        if (body.role) {
            body.id_role = (await Role.findOne({ where: { name: body.role } }))?.id_role;
        }
        
        const account = await Account.create(body);

        return res.json({
            msg: 'Cuenta creada exitosamente',
            account: await account.getFullRepr()
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}

export const putAccount = async(req: Request, res: Response) => {
    const { username } = req.params;
    const { name, password } = req.body;
    
    try {
        
        const account = await Account.findByPk(username);
        
        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));
        
        await account.update({
            name,
            password
        });
    
        return res.json({
            msg: 'Cuenta actualizada exitosamente',
            account: account.getRepr()
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}

export const addImageAccount = async(req: Request, res: Response) => {

    const { username } = req.params;

    const account = await Account.findByPk(username);

    if (!account || !account.active)
        return res.status(404).json({
            msg: `La cuenta con nombre de usuario '${username}' no existe`
        });

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

        if (!req.file)
            return res.status(400).json({
                msg: 'No se mando ningún archivo \'image\''
            });

        // convert buffer to readable stream
        const readableTrackStream = new Readable();
        readableTrackStream.push(req.file?.buffer);
        readableTrackStream.push(null);

        const bucket = new GridFSBucket(mongo.db, {
            bucketName: 'images'
        });

        const uploadStream = bucket.openUploadStream('profile-photo');
        const id = uploadStream.id;
        readableTrackStream.pipe(uploadStream);

        await account.update({
            image: id.toString()
        });

        uploadStream.on('error', () => {
            return res.status(500).json({
                msg: 'Error uploading file'
            });
        });

        uploadStream.on('finish', () => {
            return res.status(200).json({
                msg: 'La imagen de perfil se guardó correctamente'
            });
        });

    });

}

export const deleteAccount = async(req: Request, res: Response) => {
    const { username } = req.params;
    
    try {
        
        const account = await Account.findByPk(username);

        if (!account || !account.active)
            return res.status(404).json(username_not_exists(username));
        
        await account.update({
            active: false
        });
    
        return res.json({
            msg: 'Cuenta eliminada exitosamente',
            account: account.getRepr()
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json(something_went_wrong(error));
    }
}