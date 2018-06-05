import { model, Document, Schema, Types, Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

import Note, { INote } from './Note';

const userSchema: Schema = new Schema(
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

interface IUser extends Document {
  username: string;
  password: string;

  validatePassword(rawPassword: string): boolean;
  getNotes(): [INote | null];
}

userSchema.pre<IUser>('save', function(next) {
  this.password = hashSync(this.password, 10);
  next();
});

userSchema.methods.validatePassword = function(rawPassword: string): boolean {
  return compareSync(rawPassword, this.password);
};

userSchema.methods.getNotes = function() {
  return Note.find({ author: this._id }).select('-author -createdAt');
};

const User = model<IUser>('User', userSchema);
export default User;
