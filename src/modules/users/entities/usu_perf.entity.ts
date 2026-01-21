import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Usuario } from "./usuarios.entity";
import { Perfil } from "./perfiles.entity";

@Entity('usu_perf')
@Unique(['usuario_id', 'perfil_id'])
export class UsuarioPerfil {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Perfil)
  @JoinColumn({ name: 'perfil_id' })
  perfil: Perfil;

  @Column({ type: 'boolean', default: true })
  usuperf_estado: boolean;

  @CreateDateColumn()
  created_at: Date;
}
