import Joi from 'joi';

export default {
  register: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().email().allow(''),
      password: Joi.string().required(),
      fullname: Joi.string().min(3).required(),
    },
  },
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  editProfile: {
    body: {
      email: Joi.string().email().allow(''),
      fullname: Joi.string().min(3),
      password: Joi.string(),
    },
  },
};
