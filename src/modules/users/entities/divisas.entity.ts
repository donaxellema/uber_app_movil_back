import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
import { PagoViaje } from './pagos_viaje.entity';
  //import { PagoViaje } from '../pagos-viaje/pago-viaje.entity';
  
  @Entity('divisas')
  export class Divisa {
    @PrimaryGeneratedColumn()
    divisa_id: number;
  
    @Column({ type: 'varchar', length: 50 })
    divisa_descripcion: string;
  
    @Column({ type: 'varchar', length: 10 })
    divisa_simbolo: string;
  
    @Column({ type: 'boolean', default: true })
    divisa_estado: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    // Relaciones
    @OneToMany(() => PagoViaje, (pago) => pago.divisa)
    pagos: PagoViaje[];
  }
  