import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import z from "zod"
import { getUser } from "./app/lib/data"

declare module "next-auth" {
  interface User {
    username: string | null
  }

  interface Session {
    user: {
      username: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt"{
  interface JWT {
    username: string | null
  }
}

// class UsernameError extends CredentialsSignin {
//   code = "InvalidUsername"
// }

// class PasswordError extends CredentialsSignin {
//  code = "InvalidPassword"
// }

export const {auth, signIn, signOut} = NextAuth({
  pages: {
    signIn: '/login'
  },
  providers: [Credentials({
    async authorize(credentials, request) {
      const parsedCredentials = z.object({username: z.string(), password: z.string()}).safeParse(credentials)
      if(parsedCredentials.success){
        const {username, password} = parsedCredentials.data
        const user = await getUser(username)
        
        if(!user) throw new Error('', {cause: {code: 'InvalidUsername'}})
        if(user.password !== password) throw new Error('', {cause: {code: 'InvalidPassword'}})
        
        return user
      }

      return null
    },
  })],
  callbacks: {
    authorized: ({request, auth}) => {
      return !!auth
    },
    redirect: ({url}) => {
      return '/blog'
    },
    session: ({session, token}) => {
      if(token.username){
        session.user.username = token.username
      }
      return session
    },
    jwt: ({token, user}) => {
      if(user) {
        // token.id = user.id
        token.username = user.username
      }
      return token
    }
  }
})