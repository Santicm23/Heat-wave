
import path from 'path';

import { UploadedFile } from 'express-fileupload';
import { v4 as uuid } from 'uuid';


export const uploadFile = (file: UploadedFile, validExtensions: Array<string>, directory: string = '')
    : Promise<string> => {

    return new Promise((resolve, reject) => {

        const fileSplited = file.name.split('.');
        const extension = fileSplited[fileSplited.length - 1];
    
        if (!validExtensions.includes(extension))
            return reject(`La extension ${extension} no es válida (${validExtensions})`);

        const newFileName = `${uuid()}.${extension}`;
    
        const uploadPath = path.join('./uploads/', directory, newFileName);
    
        file.mv(uploadPath, (err: any) => {
            if (err)
                return reject(err);
    
            resolve(newFileName);
        });
    })
}