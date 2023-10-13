import { LoadStrategy, Options } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';

const config: Options = defineConfig({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js', 'dist/**/*.embeddable.js'],
  entitiesTs: ['src/**/*.entity.ts', 'src/**/*.embeddable.ts'],
  loadStrategy: LoadStrategy.JOINED,
  allowGlobalContext: true,
});

export default config;
