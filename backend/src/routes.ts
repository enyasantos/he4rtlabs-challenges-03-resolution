import { Router } from 'express'
import UserController from './controllers/user';
import LogonController from './controllers/logon';

const router = Router()

router.post('/register', UserController.create);
router.get('/users', UserController.index);

router.post('/auth', LogonController.create);

export default router;