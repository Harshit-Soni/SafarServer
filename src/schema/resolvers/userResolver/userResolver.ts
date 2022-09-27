import { AuthenticationError } from 'apollo-server-core'
import bcrypt from 'bcryptjs'
import { client } from '../../../db'
import { createToken } from '../../../authentication/Auth'
import { generateAuthenticationKey } from './userUtilities'
import { UserDetailsModel, UserQuerries } from './userDB'

// http status code should also be defined
// statefull (session) / stateless (JWT) (key difference ??)

export const userResolvers = {
  Query: {
    getUser: async (parent, args, { user }) => {
      try {
        if (!user) return 'no user'

        console.log(args, 'here')
        const values = await client.query(UserDetailsModel.getUsers(['username', 'age'], 'username', args.username))
        console.log(values.rows)
        return values.rows[0]
      } catch (e) {
        console.error('error', e)
        return e
      }
    },
  },
  Mutation: {
    signin: async (parent, args) => {
      try {
        const userExists = await client.query(`Select * from userdetails where username = '${args.username}'`)
        if (userExists.rowCount) {
          const validatePassword = await bcrypt.compare(args.password, userExists.rows[0].password)
          if (validatePassword) return await generateAuthenticationKey(args.username)
          else {
            throw new AuthenticationError('Wrong Password', {
              'Status code': 401,
            })
          }
        } else {
          throw new AuthenticationError('User not found', {
            'Status code': 404,
          })
        }
      } catch (e) {
        console.log(e)

        return e
      }
    },
    signup: async (parent, args) => {
      try {
        console.log(args)

        const encrypredPassword = await bcrypt.hash(args.password, 10)
        console.log('encrypredPassword', encrypredPassword)

        await client.query(`Insert into userdetails ("username", "password", "fullName", "emailid", "age", "joineddate") values(
           '${args.username}',
           '${encrypredPassword}',
           '${args.name}',
           '${args.emailId}',
           '${args.age}',
           to_timestamp(${Date.now()})
          )`)
        return 'ok'
      } catch (e) {
        console.error(e)
        return 'error'
      }
    },
  },
  // Subscription: {},
  // },
}
