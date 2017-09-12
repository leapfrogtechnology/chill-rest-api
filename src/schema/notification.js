import Joi from 'joi';

const urlRegExp = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export default {
  pass: Joi.string(),
  enabled: Joi.string(),
  sender: Joi.string().email(),
  emailId: Joi.string().email(),
  user: Joi.string().alphanum(),
  receiver: Joi.string().email(),
  roomId: Joi.string().alphanum(),
  authToken: Joi.string().alphanum(),
  accountSid: Joi.string().alphanum(),
  baseUrl: Joi.string().regex(urlRegExp),
  notificationType: Joi.string().alphanum()
};
