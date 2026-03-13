'use client'
import Link from "next/link";
import { useState } from "react";

export default function CustomLink({
  children,
  href,
  className
} : {
  children: React.ReactNode,
  href: string,
  className?: string;
}){
  const [loading, setLoading] = useState(false)

  return (<>
      {loading ? <span>Загружаю...</span> : <Link
        href={href}
        onClick={()=>setLoading(true)}
        className={`hover:underline ${className}`}>{children}</Link>}
    </>
  )
}