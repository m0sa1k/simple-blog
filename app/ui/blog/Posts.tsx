import { fetchPosts } from "@/app/lib/data"
import { Post } from "@/app/lib/types";
import CustomLink from "../CustomLink";

export default async function Posts() {
  const posts:Post[] = await fetchPosts();

  return (
    <>
      {
        posts.map(post => {
          return (
            <div
              className="min-h-20 border-b-2 border-yellow-200 mb-3 pb-1"
              key={post.id}>
              <h2 className="text-3xl mb-2">{post.title}</h2>
              <p className="mb-1">
                {post.body.substring(0, 90)}...
                
              </p>
              <div className="flex justify-between">
                <CustomLink
                    href={`blog/${post.id}`}
                  >Читать</CustomLink>
                <CustomLink
                  href={`blog/${post.id}/edit`}
                >Редактировать</CustomLink>
              </div>
            </div>
          )
        })
      }
    </>
  )
}