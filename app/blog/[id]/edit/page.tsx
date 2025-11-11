import { fetchPostsById } from "@/app/lib/data";
import EditForm from "@/app/ui/blog/edit-form";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page({params} : { params: Promise<{ id: string }> }){
  const session = await auth()
  if(!session) redirect('/login')

  const {id} = await params;
  const post = await fetchPostsById(id);

  if(!post) notFound();

  return (
    <div className="flex flex-col items-center ">
      <h1>Редактирование поста</h1>
      <EditForm post={post} /> 
    </div>
  )
}