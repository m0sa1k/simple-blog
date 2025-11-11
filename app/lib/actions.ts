"use server"

import { redirect } from "next/navigation";
import { fetchPostsById, getUser } from "./data";
import z from "zod";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import postgres from "postgres";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const PostSchema = z.object({
  title: z.string().min(5, 'Минимум 5 символов'),
  text: z.string().min(20, 'Минимум 20 символов')
})

type PostState = {
  errors?: {
    title?: string[];
    text?: string[];
  },
  defaultValues?: {
    title?: string;
    text?: string;
  },
  message?: string
} | undefined

type UserErrorState = {
  username?: string[];
  pass?: string[];
  confirmPassword?: string[];
  message?: string;
} | undefined

export const createPost = async (state: PostState, formData: FormData): Promise<PostState> => {
  const title = formData.get('title') as string;
  const text = formData.get('text') as string;

  const result = PostSchema.safeParse({
    title: title,
    text: text
  })

  if(!result.success){
    const {fieldErrors} = z.flattenError(result.error);

    return {
      errors: fieldErrors,
      defaultValues: {
        title,
        text
      }
    }
  }

  const session = await auth()
  
  if(session) 

  try {
    await sql`
      INSERT INTO posts (title, body, author_name)
      VALUES (${title}, ${text}, ${session.user.username})
    `;
  } catch (error) {
      console.log(error)
      return {
        message: 'Ошибка базы данных'
      }
  }

  redirect('/blog')
}

export const editPost = async (id: string, state: PostState, formData: FormData): Promise<PostState> => {
  const title = formData.get('title') as string;
  const text = formData.get('text') as string;

  const result = PostSchema.safeParse({
    title: title,
    text: text
  })

  if(!result.success){
    const {fieldErrors} = z.flattenError(result.error);

    return {
      errors: fieldErrors,
      defaultValues: {
        title,
        text
      }
    }
  }

  const session = await auth()
  let post = await fetchPostsById(id)

  if(session && session.user.username === post.author_name) 

  try {
    await sql`
      UPDATE posts
      SET title = ${title}, body = ${text}
      WHERE id = ${id}
    `;
  } catch (error) {
      console.log(error)
      return {
        message: 'Ошибка базы данных'
      }
  }

  redirect('/blog')
}

export const signup = async (state: UserErrorState, formData: FormData): Promise<UserErrorState> => {
  const UserSchema = z.
    object({
      username: z.string().min(3, 'Минимум 5 символов'),
      pass: z.string().min(3, 'Минимум 5 символов'),
      confirmPass: z.string()
    })
    .refine(val => val.pass === val.confirmPass, {message: 'Пароли не совпадают', path: ['confirmPassword']});
  
  const result = UserSchema.safeParse({
    username: formData.get('username'),
    pass: formData.get('password'),
    confirmPass: formData.get('confirmPass')
  })

  if(!result.success){
    const {fieldErrors} = z.flattenError(result.error)
    return fieldErrors;
  }

  try{
    const user = await getUser(result.data.username)
    if(user) {
      return {message: 'Имя пользователя занято'};
    }
  } catch {
    return {message: 'База данных не доступна'}
  }

  try{
    await sql`
      INSERT INTO users (username, password)
      VALUES (${result.data.username}, ${result.data.pass})
    `;

    await signIn('credentials', {
      username: result.data.username,
      password: result.data.pass,
      redirectTo: '/blog'
    })

  } catch(error) {
    if(isRedirectError(error)) throw error
    console.log('Database Error.', error)
    return {message: 'База данных не доступна'}
  }

  // await signIn('credentials', {
  //   username: result.data.username,
  //   password: result.data.pass,
  //   redirectTo: '/blog'
  // })
  
  // try {
  //   await signIn('credentials', {
  //     username: result.data.username,
  //     password: result.data.pass,
  //     redirectTo: '/blog'
  //   })
  // } catch(error) {
  //   console.log(error)
  // }

  // redirect('/blog')
}

export const authenticate = async (state: {message: string} | undefined , formData: FormData) => {
  try {
    await signIn('credentials', formData)
  } catch(error) {
    if(isRedirectError(error)) throw error
    if(error instanceof AuthError) {
      if(error.type === 'CallbackRouteError') {
        switch(error.cause?.code){
          case 'InvalidUsername':
            return {message: 'Неверное имя пользователя'}
          case 'InvalidPassword':
            return {message: 'Неверный пароль'}
          default:
            return {message: 'Какая-то ошибка'}
        }
      }
      if(error.type === 'CredentialsSignin') return {message: 'Ошибка'}
    }

    throw new Error('Something')
  }
}