import BlogCard from "../components/cards/BlogCard"
import BlogForm from "../components/forms/BlogForm"
import { Link } from "react-router-dom"
import cover from '../assets/group-students-posing-with-notepads.jpg'
export default function BlogHome() {

  return (
    <div className="w-full flex flex-col">
      <div className="w-full mt-5">
              <img src={cover} alt="" className="object-cover w-[99%] h-[50vh] mx-auto rounded-lg"  />
            </div>
            <div className="mt-12 flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
              <div className="flex justify-center items-center w-full mx-auto">
            <h1 className="text-3xl text-customBlue1 text-center mb-5">Our Blogs</h1>
            </div>
            <div className="flex justify-center sm:justify-end items-center">
            <button
  type="button"
  className="flex text-white bg-customBlue3 hover:bg-customBlue2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:absolute sm:right-12"
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<Link
to={"/blog-form"}
className="whitespace-nowrap">Add Post</Link>
</button>

            </div>
            </div>
            <hr className='border-t-2 border-double border-gray-400 my-12 w-[80%] mx-auto' />

<BlogCard/>


    </div>
  )
}
