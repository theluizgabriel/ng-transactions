import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import AccountsModel from './Accounts';

class Transactions extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Transactions;
