import Joi from 'joi';

export default {
  createTask: {
    body: {
      value: Joi.string().min(3).max(20).required(),
    },
  },
  updateTask: {
    body: {
      value: Joi.string().min(3).max(20),
      isCompleted: Joi.boolean(),
    },
  },
};
