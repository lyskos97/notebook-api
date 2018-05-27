import mongoose from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

import Note from './note';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

UserSchema.pre('save', function(next) {
  this.password = hashSync(this.password, 10);
  next();
});

UserSchema.methods.validatePassword = function(rawPassword) {
  console.log('this.password', this.password);
  return compareSync(rawPassword, this.password);
};

UserSchema.methods.getNotes = function() {
  return Note.find({ author: this._id }).select('-author -createdAt');
};

export default mongoose.model('User', UserSchema);
