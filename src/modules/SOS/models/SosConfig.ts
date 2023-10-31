import User from '@modules/User/models/user';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sos_config' })
export default class SosConfig {
  @PrimaryColumn({ name: 'id_sos_config' })
  id: string;

  @Column({ name: 'user_url' })
  user_url: string;

  @Column({name: 'description', type: 'text' })
  description: string;

  @Column({name: 'title' })
  title: string;

  @ManyToOne(() => User, { nullable: false, eager: true })
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
