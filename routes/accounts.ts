
import { Router } from 'express';
import { check } from 'express-validator';

import { deleteAccount, getAccount, getAccounts, postAccount, putAccount } from '../controllers/accounts';
import validateParams from '../middlewares/validate-params';
import { uniqueEmail, uniqueUsername, usernameExists } from '../helpers/db-validators';
import validateJWT from '../middlewares/validate-jwt';


const router = Router();

router.get('/', getAccounts);

router.get('/:username', check('username').custom(usernameExists), getAccount);

router.post('/', [
    check('username', 'El nombre de usuario no es válido').notEmpty().trim().matches(/[\w_]+/),
    check('username').custom(uniqueUsername),
    check('name', 'El nombre completo no es válido').notEmpty().trim().matches(/^[ a-zA-ZÀ-ÿ]+$/),
    check('email', 'El correo no es válido').notEmpty().trim().isEmail(),
    check('email').custom(uniqueEmail),
    check('password', 'La contraseña debe ser una cadena de caracteres').notEmpty().trim().isString(),
    check('password', 'La contraseña debe tener 6 letras o más').isLength({min: 6}), // .isStrongPassword(),
    validateParams 
], postAccount);

router.put('/:username', [
    validateJWT,
    check('username').custom(usernameExists),
    check('name', 'El nombre completo no es válido').optional({checkFalsy: true}).trim().matches(/^[ a-zA-ZÀ-ÿ]+$/),
    check('password', 'La contraseña debe ser una cadena de caracteres').optional({checkFalsy: true}).trim().isString(),
    check('password', 'La contraseña debe tener 6 letras o más').optional({checkFalsy: true}).isLength({min: 6}),
    validateParams
], putAccount);

router.delete('/:username', [
    validateJWT,
    check('username').custom(usernameExists),
    validateParams
], deleteAccount);


export default router;