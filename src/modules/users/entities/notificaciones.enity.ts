import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuarios.entity";

@Entity('notificaciones')
export class NotificacionE {
  @PrimaryGeneratedColumn()
  notifica_id: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'text' })
  notifica_body: string;

  @CreateDateColumn({ name: 'sent_at' })
  sent_at: Date;
}
