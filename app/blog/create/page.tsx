import CreateForm from "@/app/ui/blog/create-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page(){
  const session = await auth()
  if(!session) redirect('/login')

  return (
    <div className="flex flex-col items-center ">
      <h1 className="mb-2 text-lg">Создание поста</h1>
      <CreateForm />
    </div>
  )
}