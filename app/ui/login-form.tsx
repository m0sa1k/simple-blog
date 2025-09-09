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
        id="username"
        name="username"
        type="text"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
      />
      <button type="submit">Send</button>
      {state && state.message}
    </form>
  )
}