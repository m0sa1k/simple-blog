import LoginForm from "@/app/ui/login-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()

  if(session?.user) redirect('/blog')

  return (
    <div className="h-screen relative">
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-1/2 shadow-xl rounded-md p-4">
        <h1 className="mb-4 text-2xl uppercase">Вход</h1>
        <LoginForm />
      </div>
    </div>
  )
}