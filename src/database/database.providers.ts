import { Sequelize } from 'sequelize-typescript';
import { User, ResetPassword } from './../user/user.entity';
const HerokuDb = {
  operatorsAliases: false,
  dialect: 'mysql',
  host: 'us-cdbr-iron-east-03.cleardb.net',
  port: 3306,
  username: 'bd5b617fd8032b',
  password: '9542f819',
  database: 'heroku_d5fe62c634ae31e',
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