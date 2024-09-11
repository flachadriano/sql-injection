import { Request, Response } from "express";
import AppDataSource from "../config/Database";
import { Cargo } from "../model/Cargo";

export class CargoController {
  async list(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Cargo);
    const cargos = await repo.find();
    res.json(cargos);
  }
}