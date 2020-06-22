import HTTPStatus from 'http-status';

import Task from './task.model';

export async function getTaskList(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;

  try {
    const tasks = await Task.find({ isRemoved: false, user: req.user._id })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);
    const total = await Task.countDocuments({ isRemoved: false, user: req.user._id });

    return res.status(HTTPStatus.OK).json({ tasks, total });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createTask(req, res) {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id, });

    return res.status(HTTPStatus.CREATED).json(task);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateTask(req, res) {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id, isRemoved: false });
    if (!task) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      task[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await task.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteTask(req, res) {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id, isRemoved: false });
    if (!task) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    task.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await task.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}
