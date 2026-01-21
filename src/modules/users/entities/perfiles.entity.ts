import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity('perfiles')
export class Perfil {
  @PrimaryGeneratedColumn()
  perfil_id: number;

  @Column({ type: 'varchar', length: 50 })
  perfil_descripcion: string;

  @Column({ type: 'boolean', default: true })
  perfil_estado: boolean;

  @CreateDateColumn()
  created_at: Date;
}
