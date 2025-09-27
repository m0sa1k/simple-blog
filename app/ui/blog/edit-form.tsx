import { editPost } from "@/app/lib/actions";
import { Post } from "@/app/lib/types";

export default function EditForm({post}: {post: Post}){
  const editPostWithId = editPost.bind(null, post.id);

  return (
    <form action={editPostWithId}
      className="flex flex-col items-start gap-1"
    >
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        defaultValue={post.title}
        required
      />
      <label htmlFor="text">Text</label>
      <textarea
        id="text"
        name="text"
        rows={10}
        cols={40}
        defaultValue={post.body}
      />
      <button type="submit">Send</button>
    </form>
  )
}