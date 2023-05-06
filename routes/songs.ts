
import { Router } from 'express';

import { validateFileToUpload } from '../middlewares/validate-files';
import validateJWT from '../middlewares/validate-jwt';
import validateParams from '../middlewares/validate-params';


const router = Router();

router.get('/',);

router.get('/:id',);

router.post('/', [
    validateJWT,
    validateFileToUpload,
    validateParams
],);

router.put('/:id',);

router.delete('/:id',);


export default router;