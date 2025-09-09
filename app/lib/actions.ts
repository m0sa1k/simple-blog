"use server"

import { redirect } from "next/navigation";
import { initPosts } from "./data";
import { User } from "./types";
import z from "zod";
import { signIn } from "@/auth";
import { v4 } from "uuid";
import { AuthError } from "next-auth";

const PostSchema = z.object({
  title: z.string().min(10, 'Минимум 10 символов'),
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
}

type UserErrorState = {}

export const createPost = async (state: PostState | undefined, formData: FormData) => {
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

  initPosts.push({
    title: result.data.title,
    body: result.data.text,
    id: 'asd',
    authorName: 'asd'
  })

  if(false){
    return {
      message: 'Ошибка базы данных'
    }
  }

  // console.log(initPosts);
  // redirect('/blog')
}

export const editPost = async (id: string, formData: FormData) => {
  const title = formData.get('title') as string;
  const text = formData.get('text') as string;

  console.log(id)

  if(!title) {
    return;
  } else if(!text){
    return;
  }

  initPosts.push({
    title: title,
    body: text,
    id: 'asd',
    authorName: 'asd'
  })  

  console.log(initPosts);

  redirect('/blog')
}

export const signup = async (formData: FormData) => {
  const UserSchema = z.
    object({
      username: z.string(),
      pass: z.string().min(3, 'Минимум 3 символа'),
      confirmPass: z.string()
    })
    .refine(val => val.pass === val.confirmPass, {message: 'Пароли не совпадают'});
  
  const result = UserSchema.safeParse({
    username: formData.get('username'),
    pass: formData.get('password'),
    confirmPass: formData.get('confirmPass')
  })

  if(!result.success){
    const message = result.error.issues;
    console.log(message);
  }
  if(result.success){
    const user: User = {
      id: v4(),
      username: result.data?.username,
      password: result.data?.pass
    }
  }

  // signIn('credentials')
  // console.log(result.data)

  // const userExist = someSqlfetch(username);
  // if(userExist) return 'User Exist';

  // redirect('/blog')
}

export const authenticate = async (state: {message: string} | undefined , formData: FormData) => {
  try {
    await signIn('credentials', formData)
  } catch(error) {
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
      if(error.type === 'CredentialsSignin') return {message: 'Неверные данные'}
    }

    throw Error;
  }
}