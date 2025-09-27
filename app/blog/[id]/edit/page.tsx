import { fetchPostsById } from "@/app/lib/data";
import EditForm from "@/app/ui/blog/edit-form";
import { notFound } from "next/navigation";

export default async function Page({params} : { params: Promise<{ id: string }> }){
  const {id} = await params;
  const post = fetchPostsById(id);

  if(!post) notFound();

  return (
    <div className="flex flex-col items-center ">
      <h1>Редактирование поста</h1>
      <EditForm post={post} /> 
    </div>
  )
}