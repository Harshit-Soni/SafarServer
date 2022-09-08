// import { pool } from "../../db";

import { client } from "../../db";

export const userResolvers = {
  Query: {
    getUser: async (parent, args) => {
      console.log(args, "here");

      const values = await client.query(
        `Select * from userdetails where username='${args.username}'`
      );
      console.log(values.rows);

      return values.rows[0];
    },
  },
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
    signup: async (parent, args) => {
      try {
        console.log(args);
        await client.query(`Insert into userdetails ("username", "password", "fullName", "emailid", "age", "joineddate") values(
           '${args.username}',
           '${args.password}',
           '${args.name}',
           '${args.emailId}',
           '${args.age}',
           to_timestamp(${Date.now()})
          )`);
        return "ok";
      } catch (e) {
        console.error(e);
        return "error";
      }
    },
  },
  // Subscription: {},
  // },
};
