import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conductor } from "./conductores.entity";
import { CategoriaVehiculo } from "./categorias-vehiculo.entity";

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  vehiculo_id: number;

  @ManyToOne(() => Conductor)
  @JoinColumn({ name: 'conduct_id' })
  conductor: Conductor;

  @ManyToOne(() => CategoriaVehiculo)
  @JoinColumn({ name: 'catego_id' })
  categoria: CategoriaVehiculo;

  @Column({ length: 50 })
  vehiculo_make: string;

  @Column({ length: 50 })
  vehiculo_model: string;

  @Column({ length: 20, unique: true })
  vehiculo_plate_number: string;

  @Column({ length: 30 })
  vehiculo_color: string;

  @Column({ type: 'int' })
  vehiculo_year: number;

  @Column({ length: 20 })
  vehiculo_tipo: string;

  @Column({ default: true })
  vehiculo_estado: boolean;

  @CreateDateColumn()
  created_at: Date;
}
