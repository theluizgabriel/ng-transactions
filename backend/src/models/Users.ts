import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import AccountsModel from './Accounts';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
  }
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

Users.hasOne(AccountsModel, { foreignKey: 'id', as: 'accountId' });



export default Users;
