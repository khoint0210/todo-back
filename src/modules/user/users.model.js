import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';
import constants from '../../config/constants';

const UsersSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Username must be unique'],
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    default: null,
  },
  email: {
    type: String,
    required: false,
    minlength: 3,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UsersSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UsersSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  validatePassword(password) {
    return compareSync(password, this.password);
  },
  generateJWT() {

    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
      { expiresIn: '1d' }
    );
  },
  toJSON() {
    return {
      _id: this._id,
      username: this.username,
      // password: this.password,
      email: this.email,
      fullname: this.fullname,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
  toAuthJSON() {
    return {
      ...this.toJSON(),
      token: `JWT ${this.generateJWT()}`,
    };
  },

};

export default mongoose.model('User', UsersSchema);
