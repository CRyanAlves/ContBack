import User from '@modules/User/models/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('meu_diario')
export default class Diary {
  @PrimaryColumn({ name: 'id_my_diary' })
  id: string;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User;

  @Column({ name: 'title', type: 'varchar', length: '50' })
  title: string;

  @Column({ name: 'description', type: 'varchar', length: '255' })
  description: string;

  @Column({ name: 'question1', type: 'varchar', length: '255' })
  question1: string;

  @Column({ name: 'question2', type: 'varchar', length: '255' })
  question2: string;

  @Column({ name: 'question3', type: 'varchar', length: '255' })
  question3: string;

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
