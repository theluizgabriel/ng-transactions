import Users from '../models/Users';
import Accounts from '../models/Accounts';
import { ILogin, ObjectHTTP } from '../entities/Interfaces';
import * as bcrypt from 'bcryptjs';
import isAuthenticatedForRegister from '../utils/validates';

const salt = bcrypt.genSaltSync(10)

export default class UserService {
  constructor(private userModel = Users, private accountModel = Accounts) {}

  async login(data: ILogin): Promise<boolean> {
    const user = await this.userModel.findAll({ where: {
      username: data.username,
    } });
    if (!user[0]) return false;


    const result = true;
    return result;
  }

  async register(data: ILogin): Promise<ObjectHTTP> {
    const auth = await isAuthenticatedForRegister(data)
    if(auth.status !== 200) return auth
    const {username} = data
    const password = bcrypt.hashSync(data.password, salt)
    const accounts = await this.accountModel.findAll()
    const user = await this.userModel.create({
      username, 
      password,
      idAccount: accounts.length + 1
    });
    if(user.username) {
      await this.accountModel.create({ balance: 100 })
      return { message: 'Criado com sucesso!', status: 200 }
    }
    return { message: 'Não foi possível criar o usuário', status: 400 }
  }
}