import { Sequelize } from 'sequelize-typescript';
import { User, ResetPassword } from './../user/user.entity';
const HerokuDb = {
  operatorsAliases: false,
  dialect: 'mysql',
  host: 'us-cdbr-iron-east-03.cleardb.net',
  port: 3306,
  username: 'b19f6c1702f6ee',
  password: 'feb8b542',
  database: 'heroku_f12da9dd03095a3',
};

const LocalDb = {
  operatorsAliases: false,
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'api',
};

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize(HerokuDb);
      sequelize.addModels([
        User,
        ResetPassword,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];