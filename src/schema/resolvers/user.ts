import User from '../../models/User';

export default {
  Query: {
    users: (source: any, args: any) => {
      return User.find();
    },
    userById: (source: any, args: any) => {
      return User.findById(args.id);
    }
  },

  Mutation: {
    createUser: (source: any, args: any) => {
      return User.create(...args.payload);
    }
  }
};
