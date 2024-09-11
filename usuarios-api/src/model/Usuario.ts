import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cargo } from "./Cargo";

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: "text" })
  nome: string;
  
  @Column({ type: "text", nullable: true })
  sobrenome: string;

  @Column({ type: "integer", nullable: true })
  codigo_cargo: number;

}
