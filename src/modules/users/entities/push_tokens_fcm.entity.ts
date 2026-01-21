import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuarios.entity";

@Entity('push_tokens_fcm')
@Unique(['usuario', 'fcm_device_token'])
export class PushTokenFCM {
  @PrimaryGeneratedColumn()
  fcm_id: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'text' })
  fcm_device_token: string;

  @Column({ type: 'varchar', length: 20 })
  fcm_platform: string;

  @UpdateDateColumn()
  fcm_updated_at: Date;
}
