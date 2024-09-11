import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cargos')
export class Cargo {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: "text" })
  nome: string;
  
  @Column({ type: "text", nullable: true })
  descricao: string;

}
