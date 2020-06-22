import HTTPStatus from 'http-status';

import Users from './users.model';

export async function getUser(req, res) {
  try {
    const user = await Users.findOne({ _id: req.user._id, isRemoved: false });

    return res.status(HTTPStatus.OK).json(user);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createUser(req, res) {
  try {
    const users = await Users.findOne({ username: req.body.username, isRemoved: false });

    if (users) {
      return res.status(HTTPStatus.BAD_REQUEST).json("Username Existed");
    }

    const user = await Users.create(req.body);

    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function authUser(req, res, next) {
  try {
    res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

    return next();
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function updateUser(req, res) {
  try {
    const user = await Users.findOne({ _id: req.user._id, isRemoved: false });
    
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await Users.findOne({ _id: req.user._id, isRemoved: false });
    
    if (!user) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    user.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}