import * as express from 'express';
import UserController from '../controllers/user.controller';
import Users from '../models/Users';
import UserService from '../services/user.service';

const router = express.Router();

const userController = new UserController(new UserService(Users));

router.post('/', async (req, res) => { userController.register(req, res); });

export default router;