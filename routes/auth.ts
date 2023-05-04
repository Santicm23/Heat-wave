
import { Router } from 'express';
import { check, oneOf } from 'express-validator';

import validateParams from '../middlewares/validate-params';
import { googleSignIn, login, renewToken } from '../controllers/auth';
import validateJWT from '../middlewares/validate-jwt';


const router = Router();

router.post('/login', [
    oneOf([
        check('username', 'Se requiere el nombre de usuario o el correo').notEmpty(),
        check('email', 'El correo no es válido').notEmpty().isEmail()
    ]),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('password', 'La contraseña debe ser una cadena de caracteres de mínimo 6').isString().isLength({min: 6}),
    validateParams
], login);

router.post('/google', [
    check('id_token', 'El token de google es obligatorio').notEmpty(),
    validateParams
], googleSignIn);

router.get('/', validateJWT, renewToken);


export default router;