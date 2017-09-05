import Joi from 'joi';

const urlRegExp = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export default {
  name: Joi.string()
    .alphanum()
    .required(),
  type: Joi.string()
    .lowercase()
    .required(),
  url: Joi.string()
    .required()
    .regex(urlRegExp)
};
