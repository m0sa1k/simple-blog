import Posts from "@/app/ui/blog/Posts";
import CustomLink from "@/app/ui/CustomLink";

export default function Page(){

  return (
    <>
      <div className="flex justify-between items-end my-5">
        <h1 className="text-5xl">POSTS</h1>
        <CustomLink href='blog/create'>Create post</CustomLink>
      </div>
      <Posts />
    </>
  )
}