import { Router } from 'express';
import validate from 'express-validation';

import * as taskController from './task.controllers';
import validations from './task.validations';

import { authJwt } from '../../service/passport';

const routes = new Router();

routes.get('/', authJwt, taskController.getTaskList);
routes.post('/', authJwt, validate(validations.createTask), taskController.createTask);
routes.patch('/:id', authJwt, validate(validations.updateTask), taskController.updateTask);
routes.delete('/:id', authJwt, taskController.deleteTask);

export default routes;
