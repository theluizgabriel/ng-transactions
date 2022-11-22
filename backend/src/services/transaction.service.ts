import Transactions from '../models/Transactions';
import { ITransaction, IObjectHTTP } from '../entities/Interfaces';
import Users from '../models/Users';
import Accounts from '../models/Accounts';
import { Op } from 'sequelize';
import * as moment from 'moment-timezone'

export default class TransactionService {
  constructor(
    private _transactionModel = Transactions,
    private _accountModel = Accounts,
    private _usersModel = Users,
    ) {}

  async debitAndCredit(deb: number, cred: number, value: number) {
    try {
      await this._accountModel.increment({balance: -value}, {where: {id: deb}})
      await this._accountModel.increment({balance: value}, {where: {id: cred}})
      return true;
    } catch (_e) {
      return false;
    }
  }

  async create(data: ITransaction, user: string): Promise<IObjectHTTP> {
    const { creditedAccountUser, value } = data
    if(!creditedAccountUser) return { message: 'Digite o nome do usuário para quem quer transferir!', status: 400 }
    if (data.value <= 0) return { message: 'O valor tem que ser maior que 0', status: 400 }

    const userDeb: any = await this._usersModel.findOne({ 
      where: { username: user },
      attributes: { exclude: ['password'] },
      include: [{
        model: Accounts,
        as: 'account'
      }] })

    const userCred: any = await this._usersModel.findOne({
      where: { username: creditedAccountUser },
      attributes: { exclude: ['password'] },
      include: [{
        model: Accounts,
        as: 'account'
      }]
    })
    if (userCred === null) return { message: 'O usuário para quem quer transferir não existe!', status: 400 };
    if (userCred.id === userDeb.id) return { message: 'Você não pode transferir para si!', status: 400 };
    if (userDeb.account.balance < data.value) return { message: 'Você não tem saldo', status: 400 };

    try {
      const data = moment.tz('America/Sao_Paulo').format('DD/MM/YYYY hh:mm:ss a');
      
    const transaction = await this._transactionModel.create({
      debitedAId: userDeb.idAccount,
      creditedAId: userCred.idAccount,
      value,
      createdAt: data
    });
    

    if(transaction) this.debitAndCredit(userDeb.idAccount, userCred.idAccount, value)

    return { message: 'Transferência efetuada com sucesso!', status: 200 };
  } catch (error) {
    console.error(error);
    return { message: 'Não foi possível efetuar a transferência', status: 400 }
  }
  }

  async getTransactions(user: string): Promise<IObjectHTTP> {
    const find: any = await this._usersModel.findOne({ 
      where: { username: user },
      attributes: { exclude: ['password'] },
      include: [{
        model: Accounts,
        as: 'account'
      }] })

      const findTransactions = await this._transactionModel.findAll({
        where: { [Op.or]: [
          { debitedAId: find.idAccount },
          { creditedAId: find.idAccount }
        ] }
      })
      
      return { message: 'Tudo certo!', status: 200, json: findTransactions };
      
  }

  async getFilterTransactionDeb(filter: string, user: string): Promise<IObjectHTTP> {
    const find: any = await this._usersModel.findOne({ 
      where: { username: user },
      attributes: { exclude: ['password'] },
      include: [{
        model: Accounts,
        as: 'account'
      }] })

      const findTransactions = await this._transactionModel.findAll({
        where: { debitedAId: find.idAccount }
      })
      
      return { message: 'Tudo certo!', status: 200, json: findTransactions };
      
  }

  async getFilterTransactionCred(filter: string, user: string): Promise<IObjectHTTP> {
    const find: any = await this._usersModel.findOne({ 
      where: { username: user },
      attributes: { exclude: ['password'] },
      include: [{
        model: Accounts,
        as: 'account'
      }] })

      const findTransactions = await this._transactionModel.findAll({
        where: { creditedAId: find.idAccount }
      })
      
      return { message: 'Tudo certo!', status: 200, json: findTransactions };
      
  }
}