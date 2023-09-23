import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('meu_diario')
export default class Diary {
  @PrimaryColumn({ name: 'id_meu_diário' })
  id: string;

  @Column({ name: 'titulo', type: 'varchar', length: '50' })
  title: string;

  @Column({ name: 'pensamentos', type: 'varchar', length: '255' })
  description: string;

  @Column({ name: 'resposta_1', type: 'varchar', length: '255' })
  question1: string;

  @Column({ name: 'resposta_2', type: 'varchar', length: '255' })
  question2: string;

  @Column({ name: 'resposta_3', type: 'varchar', length: '255' })
  question3: string;

  @Column({ name: 'resposta_4', type: 'varchar', length: '255' })
  question4: string;

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
