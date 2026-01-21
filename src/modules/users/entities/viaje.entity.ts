import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuarios.entity";
import { Conductor } from "./conductores.entity";

@Entity('viajes')
export class Viaje {
  @PrimaryGeneratedColumn()
  @Index()
  viaje_id: number;

  @ManyToOne(() => Usuario)
  usuario: Usuario;

  @ManyToOne(() => Conductor)
  driver: Conductor;

  @Column('decimal', { precision: 10, scale: 7 })
  viaje_origin_lat: number;

  @Column('decimal', { precision: 10, scale: 7 })
  viaje_origin_lng: number;

  @Column('decimal', { precision: 10, scale: 7 })
  viaje_destination_lat: number;

  @Column('decimal', { precision: 10, scale: 7 })
  viaje_destination_lng: number;

  @Column('numeric', { precision: 6, scale: 2 })
  viaje_distance_km: number;

  @Column('int')
  viaje_duration_min: number;

  @Column('numeric', { precision: 8, scale: 2 })
  viaje_price: number;

  @Column({ length: 20 })
  viaje_status: string;

  @Column({ type: 'timestamp', nullable: true })
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
