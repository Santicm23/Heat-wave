
import { Router } from 'express';

import { validateAdmin } from '../middlewares/validate-permissions';
import { check } from 'express-validator';
import { getTrack, uploadTrack } from '../controllers/songs';
import validateJWT from '../middlewares/validate-jwt';
import validateParams from '../middlewares/validate-params';


const router = Router();

router.get('/',);

router.get('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    validateParams
],);

router.get('/track/:id',[
    check('id', 'El id no es válido').isMongoId(),
    validateParams
], getTrack);

router.post('/', [
    validateJWT,
    validateAdmin,
    check('name', 'El nombre de la canción es obligatorio').notEmpty(),
    check('author', 'El autor es oblicatorio').notEmpty(),
    validateParams
], uploadTrack);


export default router;