'use client'
import Link from "next/link";
import { useState } from "react";

export default function CustomLink({
  children,
  href
} : {
  children: React.ReactNode,
  href: string
}){
  const [loading, setLoading] = useState(false)

  return (<>
      {loading ? <span>Загружаю...</span> : <Link
        href={href}
        onClick={()=>setLoading(true)}
        className='hover:text-gray-700 hover:underline'>{children}</Link>}
    </>
  )
}