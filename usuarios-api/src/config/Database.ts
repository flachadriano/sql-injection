import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Usuario } from '../model/Usuario';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/config/db.sqlite',
  entities: ['src/model/*.{ts,js}'],
  migrations: ['src/migrations/*.{ts,js}'],
});

export default AppDataSource;
