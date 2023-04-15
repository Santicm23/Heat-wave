
import { Router } from 'express';

import { deletePublicacion, getPublicacion, getPublicaciones, postPublicacion, putPublicacion } from '../controllers/publicaciones';


const router = Router();

router.get('/', getPublicaciones);

router.get('/:id', getPublicacion);

router.post('/', postPublicacion);

router.put('/:id', putPublicacion);

router.delete('/:id', deletePublicacion);


export default router;