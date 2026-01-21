import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
  } from 'typeorm';
import { Vehiculo } from './vehiculos.entity';
  
  @Entity('categorias_vehiculos')
  export class CategoriaVehiculo {
    @PrimaryGeneratedColumn()
    catego_id: number;
  
    @Column({ type: 'varchar', length: 50 })
    catego_descripcion: string;
  
    @Column({ type: 'text', nullable: true })
    catego_img: string;
  
    @Column({ type: 'boolean', default: true })
    catego_estado: boolean;
  
    @CreateDateColumn()
    created_at: Date;
  
    // 🔗 Relación
    @OneToMany(() => Vehiculo, vehiculo => vehiculo.categoria)
    vehiculos: Vehiculo[];
  }
  