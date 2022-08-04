// import { pool } from "../../db";

import { client } from "../../db";

export const userResolvers = {
  Query: {
    getUserById: async (parent, args, context, info) => {
      console.log(args, "here");

      const values = await client.query(`Select * from Persons`);
      console.log(values.rows);

      return { name: "harshit", age: 23 };
    },
    // Mutation: {},
    // Subscription: {},
  },
};
