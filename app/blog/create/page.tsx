import CreateForm from "@/app/ui/blog/create-form";

export default function Page(){
  return (
    <div className="flex flex-col items-center ">
      <h1>Создание поста</h1>
      <CreateForm />
    </div>
  )
}