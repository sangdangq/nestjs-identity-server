import { User, ResetPassword } from './user.entity';

export const userProviders = [
  {
    provide: 'UserRepository',
    useValue: User,
  },
  {
    provide: 'ResetPasswordRepository',
    useValue: ResetPassword,
  },
];