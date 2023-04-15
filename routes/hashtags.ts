
import { Router } from 'express';

import { deleteHashtag, getHashtag, getHashtags, postHashtag, putHashtag } from '../controllers/hashtags';


const router = Router();

router.get('/', getHashtags);

router.get('/:id', getHashtag);

router.post('/', postHashtag);

router.put('/:id', putHashtag);

router.delete('/:id', deleteHashtag);


export default router;