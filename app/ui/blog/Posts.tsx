import { fetchPosts } from "@/app/lib/data"
import { Post } from "@/app/lib/types";
import Link from "next/link";

export default async function Posts() {
  const posts:Post[] = await fetchPosts();

  return (
    <>
      {
        posts.map(post => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>
                {post.body.substring(0, 90)}...
                <Link
                  href={`blog/${post.id}`}
                  className="text-blue-300 underline"
                >Посмотреть</Link>
              </p>
              <Link
                href={`blog/${post.id}/edit`}
                className="text-blue-300 underline"
              >Редактировать</Link>
            </div>
          )
        })
      }
    </>
  )
}