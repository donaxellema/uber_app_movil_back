import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Viaje } from "./viaje.entity";
import { Divisa } from "./divisas.entity";

@Entity('pagos_viaje')
export class PagoViaje {
  @PrimaryGeneratedColumn()
  pagos_id: number;

  @ManyToOne(() => Viaje)
  viaje: Viaje;

  @ManyToOne(() => Divisa)
  divisa: Divisa;

  @Column('numeric', { precision: 10, scale: 2 })
  pagos_amount: number;

  @Column({ length: 20 })
  pagos_method: string;

  @Column({ length: 20 })
  pagos_status: string;

  @Column({ type: 'timestamp', nullable: true })
  paid_at: Date;
}
