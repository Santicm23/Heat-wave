
import { Router } from 'express';
import { check } from 'express-validator';

import { validateAdmin } from '../middlewares/validate-permissions';
import { getSong, getSongs, getTrack, uploadTrack } from '../controllers/songs';
import validateJWT from '../middlewares/validate-jwt';
import validateParams from '../middlewares/validate-params';
import { validateFileToUpload } from '../middlewares/validate-files';


const router = Router();

router.get('/', getSongs);

router.get('/:id', getSong);

router.get('/track/:id', getTrack);

router.post('/', [
    validateJWT,
    validateAdmin,
    check('name', 'El nombre de la canción es obligatorio').notEmpty(),
    check('author', 'El autor es oblicatorio').notEmpty(),
    validateParams
], uploadTrack);


export default router;