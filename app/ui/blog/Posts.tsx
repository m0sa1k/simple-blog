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
              <p className="mb-4">
                {post.body.substring(0, 90)}...
              </p>
              {/* <img
                className="mb-5"
                src='https://cdn2.tu-tu.ru/image/pagetree_node_data/1/06b791ecdba7afcfce1e84871075a568/'
              /> */}
              <div className="flex justify-between pb-2">
                <CustomLink
                    href={`blog/${post.id}`}
                    className="text-white bg-indigo-400 rounded-full px-4 hover:bg-indigo-600"
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