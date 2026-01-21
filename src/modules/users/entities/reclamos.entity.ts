import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Viaje } from "./viaje.entity";
import { Usuario } from "./usuarios.entity";

@Entity('reclamos')
export class Reclamo {
  @PrimaryGeneratedColumn()
  recla_id: number;

  @ManyToOne(() => Viaje)
  @JoinColumn({ name: 'viaje_id' })
  viaje: Viaje;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'target_user_id' })
  targetUsuario: Usuario;

  @Column({ type: 'text' })
  recla_observacion: string;

  @Column({ type: 'boolean', default: false })
  recla_resuelto: boolean;

  @CreateDateColumn()
  created_at: Date;
}
