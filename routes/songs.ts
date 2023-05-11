
import { Router } from 'express';
import { check } from 'express-validator';

import { validateAdmin } from '../middlewares/validate-permissions';
import { getSongs, getTrack, uploadTrack } from '../controllers/songs';
import validateJWT from '../middlewares/validate-jwt';
import validateParams from '../middlewares/validate-params';


const router = Router();

router.get('/', getSongs);

router.get('/:id',);

router.get('/track/:id', getTrack);

router.post('/', [
    validateJWT,
    validateAdmin,
    check('name', 'El nombre de la canción es obligatorio').notEmpty(),
    check('author', 'El autor es oblicatorio').notEmpty(),
    validateParams
], uploadTrack);


export default router;