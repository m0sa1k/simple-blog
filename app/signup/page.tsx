import SignupForm from "@/app/ui/signup-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()

  if(session?.user) redirect('/blog')

  return (
    <>
      <h1>Регистрация</h1>
      <SignupForm />
    </>
  )
}