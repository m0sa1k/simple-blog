import Link from "next/link";
import Posts from "@/app/ui/blog/Posts";

export default function Page(){

  return (
    <>
      <h1>POSTS</h1>
      <Link href='blog/create'>Create post</Link>
      <Posts />
    </>
  )
}