'use client'
import { editPost } from "@/app/lib/actions";
import { Post } from "@/app/lib/types";
import { useActionState } from "react";

export default function EditForm({post}: {post: Post}){
  const editPostWithId = editPost.bind(null, post.id);
  const [state, formAction, isPending] = useActionState(editPostWithId, undefined)

  return (
    <form action={formAction}
      className="flex flex-col items-start gap-2"
    >
      <label className="text-lg" htmlFor="title">Заголовок</label>
      <input
        id="title"
        name="title"
        type="text"
        defaultValue={post.title}
        className="border w-full p-1 rounded-sm"
        required
      />
      <label className="text-lg" htmlFor="text">Текст поста</label>
      <textarea
        id="text"
        name="text"
        rows={10}
        cols={40}
        defaultValue={post.body}
        className="border w-full p-1 rounded-sm"
      />
      <button className="transition duration-300 ease-in-out cursor-pointer border-3 border-yellow-200 rounded-lg px-10 py-1 hover:bg-yellow-400 hover:text-white" type="submit">Отправить</button>
      {state?.message && <p className="text-red-300">{state.message}</p>}
    </form>
  )
}