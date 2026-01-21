import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { Usuario } from "./usuarios.entity";
import { Viaje } from './viaje.entity';

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  @Index()
  rating_id: number;

  @ManyToOne(() => Viaje)
  viaje: Viaje;

  @ManyToOne(() => Usuario)
  rater: Usuario;

  @ManyToOne(() => Usuario)
  ratee: Usuario;

  @Column({ type: 'int' })
  rating_score: number;

  @Column({ type: 'text', nullable: true })
  rating_comment: string;

  @CreateDateColumn()
  created_at: Date;
}
