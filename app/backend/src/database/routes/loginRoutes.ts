import { Router } from 'express';
import LoginController from '../controllers/loginController';

const router = Router();

router.post('/', LoginController.login);
router.get('/validate', LoginController.validateToken);

export default router;
