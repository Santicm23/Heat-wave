
import path from 'path';

import { UploadedFile } from 'express-fileupload';
import { UUIDV4 } from 'sequelize';


export const uploadFile = (file: UploadedFile, validExtensions: Array<string>, directory: string = '')
    : Promise<string> => {

    return new Promise((resolve, reject) => {

        const fileSplited = file.name.split('.');
        const extension = fileSplited[fileSplited.length - 1];
    
        if (!validExtensions.includes(extension))
            return reject(`La extension ${extension} no es válida (${validExtensions})`);

        const newFileName = `${UUIDV4()}.${extension}`;
    
        const uploadPath = path.join(__dirname, '../uploads/', directory, newFileName);
    
        file.mv(uploadPath, (err: any) => {
            if (err)
                return reject(err);
    
            resolve(newFileName);
        });
    })
}