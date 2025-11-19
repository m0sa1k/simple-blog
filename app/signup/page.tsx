import SignupForm from "@/app/ui/signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()

  if(session?.user) redirect('/blog')

  return (
    <div className="flex flex-col items-center pt-20 bg-gray-100 min-h-screen">
      <h1 className="my-2">Регистрация</h1>
      <SignupForm />
    </div>
  )
}