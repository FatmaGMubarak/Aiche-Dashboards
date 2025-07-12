import blogImg from "../assets/top-view-pink-keyboard-with-copyspace.jpg";
import { useEffect, useState } from "react";
import notify from "../hooks/Notifications";
import avatar from "../assets/avatar.png"
import { useSelector,useDispatch } from "react-redux";
import { fetchCommitteeById, deleteCommittee } from "../store/reducers/committeeSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteModal from '../components/confirm/DeleteModal'
export default function BlogPage() {
  const committee = useSelector((state)=>state.committee?.committee)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const nav = useNavigate()
const {id} = useParams()
useEffect(()=>{
  if(id){
    dispatch(fetchCommitteeById(id))
  }
},[dispatch, id])
  useEffect(()=>{
    window.scrollTo(0,0)

  },[])

const handleDelete = () =>{
  setIsModalOpen(true)
}

const handleCancel = () =>{
  setIsModalOpen(false);
}

 const handleConfirm = () => {
  dispatch(deleteCommittee(id)).then((res) => {
    if (res.meta.requestStatus === "fulfilled") {
     notify("You deleted this committee successfully", "success")

      nav("/committee-page");
    } else {
      console.error("Failed to delete:", res.payload);
    }
  });
};


  return (
    <>
    <DeleteModal
    onCancel={handleCancel}
    onConfirm={handleConfirm}
    isOpen={isModalOpen}
    message="Are you sure you want to delete this committee?"
    />
    <div className="flex justify-center items-center min-h-screen pt-28">
<div className="relative w-[90%] sm:max-w-6xl flex flex-col lg:flex-row bg-white shadow-2xl hover:shadow-3xl hover:bg-gray-100 transition-all duration-300 h-[80vh] sm:h-[500px] md:h-[80vh] rounded-lg overflow-hidden">
        <img
          className="w-full lg:w-[40%] h-[50%] lg:h-full lg:object-cover"
          src={committee?.img}
          alt="Blog Cover"
        />

        <div className="flex flex-col p-6 w-full lg:w-[60%] h-full justify-center">
          <div className="flex-grow">
            <h5 className="text-4xl font-bold tracking-tight text-customBlue1">
              {committee?.name}
            </h5>
            <p className="mt-5 text-lg font-normal text-gray-700">
              {committee?.description}
            </p>

          </div>

          <div className="flex justify-between items-center mt-auto pb:0 lg:pb-4">
            <Link
            to={`/edit-committee-form/${committee?.id}`}
            className="flex items-center gap-2 px-7 py-1.5 bg-customBlue2 text-white font-semibold rounded-lg hover:bg-customBlue4 transition-all duration-300">
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

            <button 
            onClick={handleDelete}
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
