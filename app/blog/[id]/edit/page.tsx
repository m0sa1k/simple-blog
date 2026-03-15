import { fetchPostsById } from "@/app/lib/data";
import EditForm from "@/app/ui/blog/edit-form";
import { notFound } from "next/navigation";

export default async function Page({params} : { params: Promise<{ id: string }> }){
  const {id} = await params;
  const post = await fetchPostsById(id);

  if(!post) notFound();

  return (
    <div className="flex flex-col items-center ">
      <h1 className="mb-2 text-lg">Редактирование поста</h1>
      <EditForm post={post} /> 
    </div>
  )
}