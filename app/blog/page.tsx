import Posts from "@/app/ui/blog/Posts";
import CustomLink from "@/app/ui/CustomLink";
import ToastHandler from "@/app/ui/toast-handler";

export default function Page(){

  return (
    <>
      <ToastHandler />
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-5xl">POSTS</h1>
        <CustomLink href='blog/create' className="text-white bg-indigo-400 rounded-full px-4 hover:bg-indigo-600">Create post</CustomLink>
      </div>
      <Posts />
    </>
  )
}