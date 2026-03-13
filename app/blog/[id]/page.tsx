import { fetchPostsById } from "@/app/lib/data";
import CustomLink from "@/app/ui/CustomLink";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({params} : { params: Promise<{ id: string }> }){
  const {id} = await params;
  const post = await fetchPostsById(id);

  if(!post) notFound();

  return (
    <>
      <h1 className="text-3xl mb-4">{post.title}</h1>
      <p className="mb-4 indent-6 text-justify">{post.body}</p>
      <div className="flex justify-between">
        <p className="text-gray-400 ">Author - {post.author_name}</p>
        <Link href={'/blog'}>Назад</Link>
      </div>
    </>
  )
}