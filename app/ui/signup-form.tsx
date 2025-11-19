'use client'
import { useActionState } from "react";
import { signup } from "@/app/lib/actions";

export default function SignupForm(){
  const [state, formAction, isPending] = useActionState(signup, undefined)
  return (
    <>
      <form
        action={formAction}
        className="flex flex-col items-start"
      >
        <label htmlFor="username">Имя пользователя</label>
        <input
          className="border border-gray-500 rounded-lg px-2 mb-2 bg-white"
          id="username"
          name="username"
          type="text"
        />
        {state?.username && <p className="text-red-500">{state.username}</p>}
        <label htmlFor="password">Пароль</label>
        <input
          className="border border-gray-500 rounded-lg px-2 mb-2 bg-white"
          id="password"
          name="password"
          type="password"
        />
        {state?.pass && <p className="text-red-500">{state.pass}</p>}
        <label htmlFor="confirmPass">Подтвердите пароль</label>
        <input
          className="border border-gray-500 rounded-lg px-2 mb-2 bg-white"
          id="confirmPass"
          name="confirmPass"
          type="password"
          required
        />
        {state?.confirmPassword && <p className="text-red-500">{state.confirmPassword}</p>}
        <button
          className="bg-green-400 text-white px-1 py-2 rounded-lg"
          type="submit">Отправить</button>
      </form>
      {state?.message && <p className="text-red-500">{state.message}</p>}
    </>
  )
}