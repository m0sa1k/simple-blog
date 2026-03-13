'use client'
import { useActionState } from "react";
import { authenticate } from "../lib/actions";
import { useRouter } from "next/navigation";

export default function LoginForm(){
  const [state, formAction, isPending] = useActionState(authenticate, undefined);
  const router = useRouter();
  
  return (
    <form
      action={formAction}
      className="flex flex-col items-start gap-2 w-64 md:w-96"
    >
      <label htmlFor="username" className="text-lg">Имя пользователя</label>
      <input
        className="border w-full p-1 rounded-sm"
        id="username"
        name="username"
        type="text"
      />
      <label htmlFor="password" className="text-lg">Пароль</label>
      <input
        className="border w-full p-1 rounded-sm"
        id="password"
        name="password"
        type="password"
      />

      {state && state.message}

      <div className="flex justify-between w-full">
        <button
          className="transition duration-300 ease-in-out cursor-pointer border-3 border-yellow-200 rounded-lg px-2 py-1 hover:bg-yellow-400 hover:text-white"
          type="submit">Отправить</button>
        <button
          className="transition duration-300 ease-in-out cursor-pointer border-3 border-yellow-200 rounded-lg px-2 py-1 hover:bg-yellow-400 hover:text-white"
          type="button" onClick={() => router.back()}>Назад</button>
      </div>
    </form>
  )
}