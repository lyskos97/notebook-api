import { Schema, Document, model, Model } from 'mongoose';

const NoteSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    collection: 'notes'
  }
);

export interface INote extends Document {
  title: string;
  text: string;

  author: Schema.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export interface INoteModel extends Model<INote> {}

const Note = model<INote>('Note', NoteSchema);

export default Note;
