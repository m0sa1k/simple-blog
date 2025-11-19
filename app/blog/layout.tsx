import { auth, signOut } from "@/auth"
import Link from "next/link"
import CustomLink from "../ui/CustomLink"

export default async function BlogLayout({
  children
} : {
  children: React.ReactNode
}){
  const session = await auth()

  return (
    <div>
      <nav className="flex flex-row bg-yellow-200 justify-between items-center px-5 min-h-10">
        <Link href='/'>LOGO</Link>
        {
          session?.user ? 
          <div className="flex gap-5">
            <p>Hello, {session.user.username}</p>
            <form action={async () => {
              'use server'
              await signOut();
            }}>
              <button>Выйти</button>
            </form>
          </div>
            :
          <div className="flex gap-5">
            <CustomLink href='/signup'>Регистрация</CustomLink>
            <CustomLink href='/login'>Войти</CustomLink>
          </div>
        }
      </nav>
      <div className="max-w-2xl m-auto">
        {children}
      </div>
    </div>
  )
}