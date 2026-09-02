import express from 'express';
import {initUser} from '../controller/user.controller.js';

const router = express.Router();

router.get('/init-user', initUser);
export default router;

