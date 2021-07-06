import express from 'express';
import {
    mainController,
    userController
} from '../controllers';

import {
    auth
} from '../middlewares';

const router = express.Router();

router.get('/healthcheck', mainController.healthcheck);

router.post('/user', userController.register.bind(userController));

router.put('/user/:id', userController.update.bind(userController));

router.post('/login', userController.login.bind(userController));

router.use(auth);

router.get('/me', userController.me.bind(userController));

export default router;
