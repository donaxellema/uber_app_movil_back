import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuarios.entity";

@Entity('conductores')
export class Conductor {
  @PrimaryGeneratedColumn()
  @Index()
  conduct_id: number;

  @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'varchar', length: 50 })
  conduct_license_number: string;

  @Column({ type: 'date' })
  conduct_license_expiry: Date;

  @Column({ default: false })
  conduct_is_verified: boolean;

  @Column({ type: 'numeric', precision: 2, scale: 1, default: 5.0 })
  conduct_rating: number;

  @CreateDateColumn()
  created_at: Date;
}
