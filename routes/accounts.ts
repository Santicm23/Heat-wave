
import { Router } from 'express';
import { check } from 'express-validator';

import { deleteAccount, getAccount, getAccounts, postAccount, putAccount } from '../controllers/accounts';
import validateParams from '../middlewares/validate-params';
import { uniqueEmail, uniqueUsername } from '../helpers/db-validators';


const router = Router();

router.get('/', getAccounts);

router.get('/:id', getAccount);

router.post('/', [
    check('username', 'El nombre de usuario no es válido').notEmpty().matches(/[\w_]+/),
    check('username').custom(uniqueUsername),
    check('name', 'El nombre completo no es válido').notEmpty().matches(/^[ a-zA-ZÀ-ÿ]+$/),
    check('email', 'El correo no es válido').notEmpty().isEmail(),
    check('email').custom(uniqueEmail),
    check('password', 'La contraseña debe ser una cadena de caracteres').notEmpty().isString(),
    check('password', 'La contraseña debe tener 6 letras o más').isLength({min: 6}),
    validateParams 
], postAccount);

router.put('/:id', putAccount);

router.delete('/:id', deleteAccount);


export default router;