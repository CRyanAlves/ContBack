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

@Entity({ name: 'brief' })
export default class Brief {
  @PrimaryColumn()
  id: string;

  @Column({type: "text"})
  description: string;

  @Column({default: false})
  status: boolean;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User;

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
