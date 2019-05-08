import { Table, Column, IsUUID, Unique, AllowNull, BeforeCreate, Model, AutoIncrement, PrimaryKey, BeforeUpdate } from 'sequelize-typescript';
import * as crypto from 'crypto-js';
import { MaxLength, IsEmail } from 'class-validator';

@Table
export class User extends Model<User>{
  @PrimaryKey
  @Column
  uid: string;

  @Column
  address1: string;

  @Column
  address2?: string;

  @Column
  agreement: boolean;

  @Column
  birthday: Date;

  @Column
  city: string;

  @Column
  company?: string;

  @Column
  country: string;

  @Column
  email: string;

  @Column
  firstname: string;

  @Column
  gender: string;

  @Column
  lastname: string;

  @Column
  password: string;

  @Column
  phone: string;

  @Column
  postcode: string;

  @Column
  regionstate: string;

  @BeforeCreate
  static hashPassword(user: User) {
    user.password = crypto.SHA256(user.password).toString();
  }
}

@Table
export class ResetPassword extends Model<ResetPassword>{
  @Column
  id: number;

  @Unique
  @PrimaryKey
  @Column
  email: string;

  @Column
  key: string;
}
