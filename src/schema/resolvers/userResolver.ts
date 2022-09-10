import { createToken, verifyToken } from "../../authentication/Auth";

import bcrypt from "bcryptjs";
import { client } from "../../db";

// http status code should also be defined
// statefull (session) / stateless (JWT) (key difference ??)

export const userResolvers = {
  Query: {
    // shouldn't it be based on token?
    getUser: async (parent, args) => {
      console.log(args, "here");

      const exist = await verifyToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaGFyc2hpdCIsImlhdCI6MTY2MjgzMzExOCwiZXhwIjoxNjYyODMzMTc4fQ.LNL6HNtNGmdBQ6-m4hxJpUyZTFD1soEzgQ_x84OhOLU"
      );

      console.log("exist", exist);

      const values = await client.query(
        `Select * from userdetails where username='${args.username}'`
      );
      console.log(values.rows);

      return values.rows[0];
    },
  },
  Mutation: {
    signin: async (parent, args) => {
      // first authenticate by checking username and password, then update the token

      try {
        console.log(args);
        const authkey = await createToken({
          name: args.username,
        });

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

        const encrypredPassword = await bcrypt.hash(args.password, 10);
        console.log("encrypredPassword", encrypredPassword);

        await client.query(`Insert into userdetails ("username", "password", "fullName", "emailid", "age", "joineddate") values(
           '${args.username}',
           '${encrypredPassword}',
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
