import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User } from "./app/lib/types"
import z from "zod"

const userArray:User[] = [
  {
    id: '124',
    username: 'Hello',
    password: '5321'
  }
]

export const {auth, signIn, signOut} = NextAuth({
  providers: [Credentials({
    async authorize(credentials, request) {
      const parsedCredentials = z.object({username: z.string(), password: z.string()}).safeParse(credentials)

      if(parsedCredentials.success){
        const {username, password} = parsedCredentials.data
        const user = userArray.find(user => user.username === username)

        if(!user) throw new Error('', {cause: {code: 'InvalidUsername'}})
        if(user.password !== password) throw new Error('', {cause: {code: 'InvalidPassword'}})

        return user
      }

      return null
    },
  })]
})