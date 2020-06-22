import userRoutes from './user/users.routes';
import taskRoutes from './tasks/task.routes';

export default app => {
  app.use('/user', userRoutes);
  app.use('/task', taskRoutes);
};
