import { Router } from 'express'
import UserController from './controllers/user';
import LogonController from './controllers/logon';

const router = Router()

router.post('/register', UserController.create);
router.post('/logon', LogonController.create);

export default router;