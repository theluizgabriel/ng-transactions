import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: string;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  creditedAId: {
    type: INTEGER,
    allowNull: false,
  },
  debitedAId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: STRING,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

Accounts.hasMany(Transactions, { foreignKey: 'id', as: 'debitedAccountId' });
Accounts.hasMany(Transactions, { foreignKey: 'id', as: 'creditedAccountId' });

Transactions.belongsTo(Accounts, { foreignKey: 'debitedAId', as: 'debitedAccountId' });
Transactions.belongsTo(Accounts, { foreignKey: 'creditedAId', as: 'creditedAccountId' });

export default Transactions;
