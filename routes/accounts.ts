
import { Router } from 'express';

import { deleteAccount, getAccount, getAccounts, postAccount, putAccount } from '../controllers/accounts';


const router = Router();

router.get('/', getAccounts);

router.get('/:id', getAccount);

router.post('/', postAccount);

router.put('/:id', putAccount);

router.delete('/:id', deleteAccount);


export default router;