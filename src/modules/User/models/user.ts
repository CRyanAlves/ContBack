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

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'tel_user', type: 'varchar', length: 11 })
  telUser: number;

  @Column({ name: 'tel_emg_user', type: 'varchar', length: 11 })
  telEmgUser: number;

  @Column({name: 'admin', default: 'false'})
  admin: string;

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

// CSV
