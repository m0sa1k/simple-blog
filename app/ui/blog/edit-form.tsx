import { editPost } from "@/app/lib/actions";
import { Post } from "@/app/lib/types";

export default function EditForm({post}: {post: Post}){
  const editPostWithId = editPost.bind(null, post.id);

  return (
    <form action={editPostWithId}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        defaultValue={post.title}
        required
      />
      <label htmlFor="text">Text</label>
      <input
        id="text"
        name="text"
        type="text"
        defaultValue={post.body}
        required
      />
      <button type="submit">Send</button>
    </form>
  )
}