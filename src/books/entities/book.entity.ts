/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity('book')
export class Book{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  genre: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  sinopsis: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  bookUrl: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'boolean',
    nullable: true,
    default: null
  })
  deleted: boolean;

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
