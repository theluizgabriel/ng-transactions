import { Request, Response } from 'express';
import UserService from '../services/user.service';
import tokenGenerate from '../utils/jwtfuncs';

export default class UserController {
  constructor(private _userService: UserService) {}

  async login(req: Request, res: Response) {
    const service = await this._userService.login(req.body);
    if (!service) return res.status(401).json({ message: 'Email ou senha incorreta(o)' });
    const token = tokenGenerate(req.body);
    return res.status(200).json({ token });
  }

  async register(req: Request, res: Response) {
    const user = await this._userService.register(req.body);
    return res.status(user.status).send({message: user.message});
  }
}