import { Request, Response } from "express";
import AppDataSource from "../config/Database";
import { Usuario } from "../model/Usuario";

export class UsuarioController {
  async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Usuario);
    let usuarios;

    if (req.query.id_in) {
      usuarios = await repo.query(
        "select * " +
        "from usuarios " +
        "where codigo_cargo = 1 " +
        "and codigo in (" + req.query.id_in + ")"
      );
    } else if (req.query.id) {
      usuarios = await repo.query(
        "select * " +
        "from usuarios " +
        "where codigo_cargo = 1 " +
        "and codigo = " + req.query.id
      );
    } else if (req.query.nome) {
      usuarios = await repo.query(
        "select * " +
        "from usuarios " +
        "where codigo_cargo = 1 " +
        "and lower(nome) like ('%" + req.query.nome + "%')"
      );
    } else {
      usuarios = await repo.findBy({ codigo_cargo: 1 });
    }

    res.json(usuarios);
  }

  async create(req: Request, res: Response) {
    const { nome, sobrenome, codigo_cargo }: { 
      nome: string, sobrenome: string, codigo_cargo: number
    } = req.body;
    const usuario = new Usuario();
    usuario.nome = nome;
    usuario.sobrenome = sobrenome;
    usuario.codigo_cargo = codigo_cargo;

    const repo = AppDataSource.getRepository(Usuario);
    await repo.save(usuario);

    res.json(usuario);
  }

  async get(req: Request, res: Response) {
    const id = req.params.id;

    const repo = AppDataSource.getRepository(Usuario);
    const usuario = await repo.findOneBy({ codigo: parseInt(id, 10) });

    res.json(usuario);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const { nome, sobrenome } = req.body;

    const repo = AppDataSource.getRepository(Usuario);
    const usuario = await repo.findOneBy({ codigo: parseInt(id, 10) });
    usuario.nome = nome;
    usuario.sobrenome = sobrenome;

    await repo.save(usuario);
    res.json(usuario);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    const repo = AppDataSource.getRepository(Usuario);
    await repo.delete(id);
    res.json({ message: "Sucesso ao deletar usuario" });
  }
}
