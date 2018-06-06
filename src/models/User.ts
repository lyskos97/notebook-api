import { model, Document, Schema, Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt';

import Note, { INoteModel } from './Note';

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
  getNotes(): [INoteModel | null];
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

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
