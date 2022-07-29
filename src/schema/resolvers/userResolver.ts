export const userResolvers = {
  Query: {
    getUserById: async (parent, args, context, info) => {
      console.log(args, "here");
      return { name: "harshit", age: 23 };
    },
    // Mutation: {},
    // Subscription: {},
  },
};
