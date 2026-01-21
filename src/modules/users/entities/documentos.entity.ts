import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conductor } from "./conductores.entity";

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn()
  docume_id: number;

  @ManyToOne(() => Conductor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conductor_id' })
  conductor: Conductor;

  @Column({ type: 'varchar', length: 30 })
  docume_tipo: string;

  @Column({ type: 'text' })
  archivo_url: string;

  @Column({ type: 'boolean', default: false })
  valido: boolean;

  @CreateDateColumn({ name: 'uploaded_at' })
  uploaded_at: Date;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
