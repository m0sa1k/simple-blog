import CreateForm from "@/app/ui/blog/create-form";

export default async function Page(){

  return (
    <div className="flex flex-col items-center ">
      <h1 className="mb-2 text-lg">Создание поста</h1>
      <CreateForm />
    </div>
  )
}