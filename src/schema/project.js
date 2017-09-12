import Joi from 'joi';

export default {
  description: Joi.string().required(),
  name: Joi.string()
    .alphanum()
    .required()
};
