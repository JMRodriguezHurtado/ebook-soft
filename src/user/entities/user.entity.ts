/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: null
  })
  deleted: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async setDeleted () {
    this.deleted = false}

  async softDelete() {
    this.deleted = true;
  }

  async recover() {
    this.deleted = false;
    return this;
  }

} 