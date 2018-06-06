import Note from '../../models/Note';

export default {
  Query: {
    notes: (source: any, args: any) => {
      return Note.find();
    },
    noteById: (source: any, args: any) => {
      return Note.findById(args.id);
    }
  },

  Mutation: {
    createNote: (source: any, args: any) => {
      return Note.create(...args.payload);
    }
  }
};
