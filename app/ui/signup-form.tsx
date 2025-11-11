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
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
        />
        {state?.username && <p className="text-red-500">{state.username}</p>}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
        />
        {state?.pass && <p className="text-red-500">{state.pass}</p>}
        <label htmlFor="confirmPass">Confirm password</label>
        <input
          id="confirmPass"
          name="confirmPass"
          type="password"
          required
        />
        {state?.confirmPassword && <p className="text-red-500">{state.confirmPassword}</p>}
        <button type="submit">Send</button>
      </form>
      {state?.message && <p className="text-red-500">{state.message}</p>}
    </>
  )
}