import { fetchPostsById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page({params} : { params: Promise<{ id: string }> }){
  const {id} = await params;
  const post = await fetchPostsById(id);

  if(!post) notFound();

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Author - {post.author_name}</p>
    </>
  )
}