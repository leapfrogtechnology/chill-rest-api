import Joi from 'joi';

const urlRegExp = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export default {
  sender: Joi.string().email(),
  receiver: Joi.string().email(),
  authToken: Joi.string().alphanum(),
  accountSid: Joi.string().alphanum(),
  user: Joi.string().alphanum(),
  pass: Joi.string(),
  roomId: Joi.number().positive(),
  emailId: Joi.string().email(),
  baseUrl: Joi.string().regex(urlRegExp)
};
