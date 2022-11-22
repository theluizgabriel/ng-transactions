import Users from '../models/Users';
import Accounts from '../models/Accounts';
import { ILogin, JSONBalance, IObjectHTTP } from '../entities/Interfaces';
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
    const result = bcrypt.compareSync(data.password, user[0]?.password);
    if (!result) return false;
    return true;
  }

  async register(data: ILogin): Promise<IObjectHTTP> {
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

  async balance(username: string): Promise<IObjectHTTP> {
    const user = await Users.findAll({
      where: { username },
      attributes: {exclude: ['password']},
      include: [{
        model: Accounts,
        as: 'account',
      }]
    })    
    const json: JSONBalance = user[0].toJSON()
    console.log(json);
    
  
    if (json) {
      const { balance } = json.account;
      return { message: `${balance}`, status: 200 }
    }
    return { message: 'Não foi possível achar seu valor em conta', status: 400 }
  }

  async getUsernameById(id: number): Promise<IObjectHTTP> {
    try {
      const user = await Users.findByPk(id)
      if (user) return { message: `${user.username}`, status: 200 }
    } catch (e: any) {
      return { message: `${e.error}`, status: 400 }
    }
    return { message: "Não existe esse usuário!" , status: 400 }
  }
}