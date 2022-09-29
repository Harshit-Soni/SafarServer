export const UserQuerries = {
  getUserbyUsername: (username) => `Select * from userdetails where username='${username}'`,
}
export const UserDetailsModel = {
  getUsers: (option, key?, value?) => {
    if (!option.length) {
      if (key && value) return `Select * from userdetails where ${key}='${value}'`
      else return `Select * from userdetails`
    } else {
      if (key && value) return `Select ${option.join(',')} from userdetails where ${key}='${value}'`
      else return `Select * from userdetails`
    }
  },
}
