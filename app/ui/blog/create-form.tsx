'use client'
import { createPost } from "@/app/lib/actions";
import { useActionState } from "react";

export default function CreateForm(){
  const [state, formAction, isPending] = useActionState(createPost, undefined)

  return (
    <form action={formAction}
      className="flex flex-col items-start gap-1"
    >
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        defaultValue={state?.defaultValues?.title}
      />

      {state?.errors && <p className="text-red-600">{state.errors.title}</p>}

      <label htmlFor="text">Text</label>
      <textarea
        id="text"
        name="text"
        rows={10}
        cols={40}
        defaultValue={state?.defaultValues?.text}
      />

      {state?.errors && <p className="text-red-600">{state.errors.text}</p>}

      <button type="submit"
        className="cursor-pointer border-2 border-solid border-amber-500 rounded-r-lg px-10 py-1"
        disabled={isPending}
      >
        Send
      </button>

      {state?.message && <p className="text-red-600">{state.message}</p>}
    </form>
  )
}