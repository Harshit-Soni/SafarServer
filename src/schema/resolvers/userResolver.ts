import { AuthenticationError } from "apollo-server-core";
import bcrypt from "bcryptjs";
import { client } from "../../db";
import { createToken } from "../../authentication/Auth";

// http status code should also be defined
// statefull (session) / stateless (JWT) (key difference ??)

export const userResolvers = {
  Query: {
    getUser: async (parent, args, { user }) => {
      try {
        if (!user) return "no user";

        console.log(args, "here");
        const values = await client.query(
          `Select * from userdetails where username='${args.username}'`
        );
        console.log(values.rows);
        return values.rows[0];
      } catch (e) {
        console.error("error", e);
        return e;
      }
    },
  },
  Mutation: {
    signin: async (parent, args) => {
      // first authenticate by checking username and password, then update the token

      try {
        console.log(args);
        const isAuthenticated = await client.query(
          `Select username from userdetails where username = '${args.username}'`
        );

        // check password also

        if (isAuthenticated.rowCount) {
          const authkey = await createToken({
            name: args.username,
          });

          const userExists = await client.query(
            `Select username from users where username = '${args.username}'`
          );

          if (userExists.rowCount) {
            // update authkey
            await client.query(
              `Update users set authkey='${authkey}' where username = '${args.username}'`
            );
          } else {
            // inset authkey and timeStamp
            await client.query(`Insert into users values(
            '${authkey}',
              to_timestamp(${Date.now()}),
              '${args.username}'
            )`);
          }
          return authkey;
        }

        throw new AuthenticationError("unauthenticated user", {
          "Status code": 401,
        });
      } catch (e) {
        console.error("error", e);
        return e;
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
