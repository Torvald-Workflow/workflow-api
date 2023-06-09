import * as Joi from 'joi';

export default () => ({
  database_uri: process.env.DATABASE_URI,
  secret: process.env.SECRET,
});

export const validationSchema = Joi.object({
  DATABASE_URI: Joi.string().required(),
  SECRET: Joi.string().required(),
});
