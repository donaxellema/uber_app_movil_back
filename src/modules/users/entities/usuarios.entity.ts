import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Persona } from './personas.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  @Index()
  usuario_id: number;

  @OneToOne(() => Persona)
  @JoinColumn({ name: 'person_id' })
  persona: Persona;

  @Column({ type: 'varchar', length: 50, unique: true })
  usuario_nickname: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  usuario_email: string;

  @Column({ type: 'varchar', length: 20 })
  usuario_phone: string;

  @Column({ type: 'text' })
  usuario_password_hash: string;

  @Column({ type: 'text', nullable: true })
  usuario_profile_picture: string;

  @Column({ type: 'boolean', default: true })
  usuario_estado: boolean;

  @CreateDateColumn()
  created_at: Date;
}
