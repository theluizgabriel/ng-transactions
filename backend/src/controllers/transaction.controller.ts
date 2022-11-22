import { Request, Response } from 'express';
import TransactionService from '../services/transaction.service';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class TransactionController {
  constructor(private _transactionService: TransactionService) {}

  async create(req: Request, res: Response) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Voce não tem autorização' });
    
    const verify: any = jwt.verify(token, secret);
      const transaction = await this._transactionService.create(req.body, verify.username);
      return res.status(transaction.status).send({message: transaction.message});
  }

  async getTransactions(req: Request, res: Response) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Voce não tem autorização' });
    
    const verify: any = jwt.verify(token, secret);
    const transaction = await this._transactionService.getTransactions(verify.username);
    return res.status(transaction.status).send(transaction.json);
  }

  async getFilterTransaction(req: Request, res: Response) {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Voce não tem autorização' });
    const { filter } = req.params;
    
    const verify: any = jwt.verify(token, secret);
    if(req.params.filter === 'deb') {
      const transaction = await this._transactionService.getFilterTransactionDeb(filter, verify.username);
      return res.status(transaction.status).send(transaction.json);
    }
    const transaction = await this._transactionService.getFilterTransactionCred(filter, verify.username);
      return res.status(transaction.status).send(transaction.json);
    
  }

}