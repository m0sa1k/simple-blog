import { fetchPosts } from "@/app/lib/data"
import { Post } from "@/app/lib/types";
import Link from "next/link";

export default function Posts() {
  const posts:Post[] = fetchPosts();

  return (
    <>
      {
        posts.map(post => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <Link href={`blog/${post.id}/edit`}>Редактировать</Link>
              <Link href={`blog/${post.id}`}>Посмотреть</Link>
            </div>
          )
        })
      }
    </>
  )
}