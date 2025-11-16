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
      <nav className="flex flex-row bg-yellow-200 justify-right gap-2 min-h-5">
        <Link href='/'>LOGO</Link>
        {
          session?.user ? 
          <>
            <p>Hello, {session.user.username}</p>
            <form action={async () => {
              'use server'
              await signOut();
            }}>
              <button>Sign Out</button>
            </form>
          </>
            :
          <>
            <CustomLink href='/signup'>Регистрация</CustomLink>
            <CustomLink href='/login'>Войти</CustomLink>
          </>
        }
      </nav>
      <div className="max-w-2xl m-auto">
        {children}
      </div>
    </div>
  )
}