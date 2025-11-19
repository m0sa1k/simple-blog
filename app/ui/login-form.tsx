'use client'
import { useActionState } from "react";
import { authenticate } from "../lib/actions";

export default function LoginForm(){
  const [state, formAction, isPending] = useActionState(authenticate, undefined)
  
  return (
    <form
      action={formAction}
      className="flex flex-col items-start"
    >
      <label htmlFor="username">Username</label>
      <input
        className="border border-gray-500 rounded-lg px-2 mb-2 bg-white"
        id="username"
        name="username"
        type="text"
      />
      <label htmlFor="password">Password</label>
      <input
        className="border border-gray-500 rounded-lg px-2 mb-2 bg-white"
        id="password"
        name="password"
        type="password"
      />
      <button
        className="bg-green-400 text-white px-1 py-2 rounded-lg"
        type="submit">Send</button>
      {state && state.message}
    </form>
  )
}