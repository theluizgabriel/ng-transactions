import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { tokenGenerate } from '../utils/jwtfuncs';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class UserController {
  constructor(private _userService: UserService) {}

  async login(req: Request, res: Response) {
    const service = await this._userService.login(req.body);
    if (!service) return res.status(401).json({ message: 'Nome de usuário ou senha incorreta(o)(s)' });
    const token = tokenGenerate(req.body);
    req.headers.authorization = token;
    return res.status(200).json({ token });
  }

  async register(req: Request, res: Response) {
    const user = await this._userService.register(req.body);
    return res.status(user.status).send({message: user.message});
  }

  async balance(req: Request, res: Response) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Voce não tem autorização' });
    const verify: any = jwt.verify(token, secret);
    
    const user = await this._userService.balance(verify.username);
    return res.status(user.status).send({username: verify.username, balance: Number(user.message)});
  }

  async getUsernameById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this._userService.getUsernameById(Number(id))
    return res.status(user.status).send({ username: user.message });
  }
}