import NextAuth, { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import Credentials from "next-auth/providers/credentials"
import z from "zod"
import { getUser } from "@/app/lib/data"
import { NextRequest, NextResponse } from "next/server"

declare module "next-auth" {
  interface User {
    username: string;
    my_posts: string[] | null;
  }
}

declare module "next-auth/jwt"{
  interface JWT {
    username: string;
    posts: string[] | null;
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
    authorized: async ({
      request, 
      auth
    }: {
      request: NextRequest; 
      auth: Session | null
    }) => {

      if(!!auth && request.nextUrl.pathname.includes('edit')) {
        const result = request.nextUrl.pathname.split('/');

        if(!auth?.user?.my_posts?.includes(result[2])) {
          return NextResponse.redirect(new URL('/blog?error=forbidden', request.url));
        }
      }

      return !!auth;
    },
    session: ({session, token}) => {
      if(token.username){
        session.user.username = token.username;
        session.user.my_posts = token.posts;
      }
      return session
    },
    jwt: ({token, user}) => {
      if(user) {
        token.username = user.username;
        token.posts = user.my_posts;
      }
      return token
    }
  }
})