import express from 'express';
import { mainController } from '../controllers';

const router = express.Router();

router.get('/healthcheck', mainController.healthcheck);

export default router;
