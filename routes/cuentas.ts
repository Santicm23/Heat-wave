
import { Router } from 'express';

import { deleteCuenta, getCuenta, getCuentas, postCuenta, putCuenta } from '../controllers/cuentas';


const router = Router();

router.get('/', getCuentas);

router.get('/:id', getCuenta);

router.post('/', postCuenta);

router.put('/:id', putCuenta);

router.delete('/:id', deleteCuenta);


export default router;