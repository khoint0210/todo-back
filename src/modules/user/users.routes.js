import { Router } from 'express';
import validate from 'express-validation';

import * as userController from './users.controllers';
import validations from './users.validations';
import { authJwt, authLocal } from '../../service/passport';

const routes = new Router();

routes.get('/', authJwt, userController.getUser);
routes.delete('/',authJwt ,userController.deleteUser);
routes.patch('/', authJwt, validate(validations.editProfile),userController.updateUser);
routes.post('/register', validate(validations.register),userController.createUser);
routes.post('/login', validate(validations.login) ,authLocal, userController.authUser);

export default routes;
