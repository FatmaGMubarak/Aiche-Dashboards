import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAwardById, deleteAward } from "../../store/reducers/awardSlice";
import notify from "../../hooks/Notifications";
import DeleteModal from '../../components/confirm/DeleteModal'
export default function AwardCard() {
  const nav = useNavigate()
  const {id} = useParams()
  const award = useSelector((state)=>state.award?.award)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

useEffect(()=>{
    if(id)
    {
        dispatch(fetchAwardById(id))
    }
},[dispatch, id])
  useEffect(()=>{
    window.scrollTo(0,0)

  },[])

const handleDelete = () =>{
  setIsModalOpen(true)
}

const handleCancel = () =>{
  setIsModalOpen(false)
}

const handleConfirm = () =>{
  dispatch(deleteAward(id))
  notify("You deleted this award successfully", "success")
  nav("/award-page")
}
  return (
    <>
    <DeleteModal
    onCancel={handleCancel}
    onConfirm={handleConfirm}
    isOpen={isModalOpen}
    message="Are you sure you want to delete this award?"
    />
    <div className="flex w-full justify-center items-center min-h-screen pt-28">
        <div className="w-[40vw] h-[30vh]">
            <div key={award?.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all flex flex-col">
                <div className='flex'>
              <div className="w-full flex justify-end items-center">
                <h3 className="text-xl font-bold text-gray-800">{award?.title}</h3>
              </div>
              <div className="w-full flex justify-end items-end">
                <p className="text-sm text-gray-600 mt-1">{award?.date}</p>
              </div>

              </div>
              <p className="mt-3 text-gray-700 text-center">{award?.description}</p>
              <div className="flex justify-between items-center mt-7 pb:0 lg:pb-1">
            <Link
          to={`/edit-award-form/${award?.id}`}
            className="flex items-center gap-2 px-7 py-1.5 bg-customBlue3 text-white font-semibold rounded-lg hover:bg-customBlue2 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <p>Edit</p>
            </Link>

            <button onClick={handleDelete}
             className="flex items-center gap-2 px-7 py-1.5 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition-all ease-in-out duration-300 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              <p>Delete</p>
            </button>
          </div>
            </div>

        </div>
    </div>
    </>
  );
}
