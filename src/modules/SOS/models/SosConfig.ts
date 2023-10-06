import User from '@modules/User/models/user';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sos_config' })
export default class SosConfig {
  @PrimaryColumn({ name: 'id_sos_config' })
  id: string;

  @Column({ name: 'UserUrl' })
  UserUrl: string;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_user' })
  id_user: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
