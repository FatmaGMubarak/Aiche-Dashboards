import cover from '../assets/group-students-posing-with-notepads.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TaskCard from '../components/cards/TaskCard'
import { useEffect } from 'react'
export default function TaskPage() {
  const nav = useNavigate()
const { id: comm_id } = useParams();
    useEffect (()=>{
        window.scrollTo(0, 0)
    },[])

const handleNavigateToTaskForm = () => {
    nav(`/committees/${comm_id}/task-form`, { replace: true });
  };

  return (
    <>
    <div className="w-full flex flex-col">
          <div className="w-full mt-5">
             <img src={cover} alt="" className="object-cover w-[99%] h-[50vh] mx-auto rounded-lg"  />
        </div>

<div className="mt-12 flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
    <div className="flex justify-center items-center w-full mx-auto">
    <h1 className='text-3xl font-semibold'>
        Tasks
    </h1>
    </div>
    <div className="flex justify-center sm:justify-end items-center">
            <button
            onClick={handleNavigateToTaskForm}
        type="button"
  className="flex text-white bg-customBlue2 hover:bg-customBlue4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:absolute sm:right-12"
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<p className='whitespace-nowrap'>Add Task</p>
</button>

    </div>
</div>

<hr className='border-t-2 border-double border-gray-400 my-12 w-[80%] mx-auto' />
<div>
    <TaskCard/>
</div>






    </div>
    </>
  )
}
