import * as express from 'express';
import { validateToken, validateTokenExists } from '../utils/tokenValidations';
import UserController from '../controllers/user.controller';
import Users from '../models/Users';
import UserService from '../services/user.service';

const router = express.Router();

const userController = new UserController(new UserService(Users));

router.get('/', validateTokenExists, validateToken, async (req, res) => { userController.balance(req, res); });

export default router;