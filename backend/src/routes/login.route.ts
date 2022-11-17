import * as express from 'express';
import LoginController from '../controllers/user.controller';
import Users from '../models/Users';
import LoginService from '../services/user.service';
// import validateFields from '../utils/loginValidate';
// import { validateToken } from '../utils/tokenValidate';

const router = express.Router();

const loginController = new LoginController(new LoginService(Users));

router.post('/', async (req, res) => { loginController.login(req, res); });

export default router;