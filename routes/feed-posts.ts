
import { Router } from 'express';

import { deleteFeedPost, getFeedPost, getFeedPosts, getImageFeedPost, postFeedPost, putFeedPost, getAllFeedPosts } from '../controllers/feed-posts';
import { validateFileToUpload } from '../middlewares/validate-files';
import validateJWT from '../middlewares/validate-jwt';
import validateParams from '../middlewares/validate-params';
import { check } from 'express-validator';
import { songExists } from '../helpers/db-validators';


const router = Router();

router.get('/', getAllFeedPosts);

router.get('/:username', getFeedPosts);

router.get('/image/:id_feed_post', getImageFeedPost);

router.get('/:username/:id_feed_post', getFeedPost); //ToDo corregir validacion id existente 

router.post('/:username/:id_song', [
    validateJWT,
    // validateFileToUpload,
    check('id_song', 'Se debe añadir una canción (id numérico)').notEmpty().isNumeric(),
    check('id_song').custom(songExists),
    validateParams
], postFeedPost);

router.put('/:id', putFeedPost);

router.delete('/:id', deleteFeedPost);


export default router;