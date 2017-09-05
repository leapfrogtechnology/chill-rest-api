import Joi from 'joi';

export default {
  name: Joi.string()
    .alphanum()
    .required(),
  type: Joi.string()
    .lowercase()
    .required(),
  url: Joi.string().required()
};
