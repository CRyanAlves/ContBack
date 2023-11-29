import 'reflect-metadata';
import { Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export default class User {
  @PrimaryColumn({ name: 'id_user' })
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ name: 'googleId', select: false })
  googleId: string;

  @Column({ name: 'isAdmin', default: false })
  isAdmin: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
