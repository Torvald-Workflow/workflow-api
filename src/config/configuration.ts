import * as Joi from 'joi';

export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});

export const validationSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().default(5432),
  MAILER_IGNORE_TLS: Joi.boolean().required(),
  MAILER_SECURE: Joi.boolean().required(),
  MAILER_USER: Joi.string().required(),
  MAILER_PASSWORD: Joi.string().required(),
});
