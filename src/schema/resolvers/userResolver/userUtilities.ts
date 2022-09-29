import { createToken } from '../../../authentication/Auth'
import { client } from '../../../db'

export const generateAuthenticationKey = async (username) => {
  const authkey = await createToken({
    name: username,
  })
  const isAuthenticated = await client.query(`Select username from users where username = '${username}'`)
  if (isAuthenticated.rowCount) {
    // update authkey
    await client.query(`Update users set authkey='${authkey}' where username = '${username}'`)
  } else {
    // inset authkey and timeStamp
    await client.query(`Insert into users values(
    '${authkey}',
    to_timestamp(${Date.now()}),
    '${username}'
    )`)
  }
  return authkey
}
