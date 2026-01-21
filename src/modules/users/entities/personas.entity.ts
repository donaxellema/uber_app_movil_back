import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  @Index()
  person_id: number;

  @Column({ type: 'varchar', length: 100 })
  person_nombres: string;

  @Column({ type: 'varchar', length: 100 })
  person_apellidos: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  @Index()
  person_ci: string;

  @Column({ type: 'varchar', length: 50 })
  person_documento: string;

  @Column({ type: 'date' })
  person_fechanac: Date;

  @Column({ type: 'char', length: 1 })
  person_sexo: string;

  @Column({ type: 'boolean', default: true })
  person_estado: boolean;

  @CreateDateColumn()
  created_at: Date;
}
