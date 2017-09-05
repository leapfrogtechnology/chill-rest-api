import Joi from 'joi';

export default {
  name: Joi.string()
    .alphanum()
    .required(),
  description: Joi.string().required()
};
