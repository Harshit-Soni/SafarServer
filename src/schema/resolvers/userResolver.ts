// import { pool } from "../../db";

import { HttpQueryError } from "apollo-server-core";
import { client } from "../../db";

export const userResolvers = {
  // Query: {
  //   getUserById: async (parent, args, context, info) => {
  //     console.log(args, "here");

  //     const values = await client.query(`Select * from Persons`);
  //     console.log(values.rows);

  //     return { name: "harshit", age: 23 };
  //   },
  Mutation: {
    signin: async (parent, args) => {
      try {
        console.log(args);
        const authkey = `${args.username}.${args.password}`;
        await client.query(`Insert into users values(
           '${authkey}',
            to_timestamp(${Date.now()}),
            '${args.username}'
          )`);
        return authkey;
      } catch (e) {
        console.error(e);
        return "error";
      }
    },
  },
  // Subscription: {},
  // },
};
