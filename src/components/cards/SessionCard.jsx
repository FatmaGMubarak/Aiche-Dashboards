import { useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { fetchSessions, deleteSession } from '../../store/reducers/sessionSlice'
import DeleteModal from '../../components/confirm/DeleteModal'
import notify from '../../hooks/Notifications'

export default function SessionCard() {
  const sessions = useSelector((state)=>state.session.sessions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sessionToDelete, setSessionToDelete] = useState(null)
  const dispatch = useDispatch()
  const {id: committeeId } = useParams()
    const [visible, setVisible] = useState(9)
    const handleViewMore = () => setVisible((prev) => prev + 9)
    const handleViewLess = () => setVisible((prev) => (prev > 9 ? prev - 9 : prev))
useEffect(()=>{
dispatch(fetchSessions())
},[dispatch])
 
const handleDelete = (id) =>{
  setSessionToDelete(id)
  setIsModalOpen(true)
}

const handleCancel = () =>{
  setIsModalOpen(false)
}

const handleConfirm = () =>{
                                const comm_id = committeeId;  
                                const id = sessionToDelete;  
                                if (comm_id && id) {  
                                   dispatch(deleteSession({ comm_id, id })); 
                                   notify("You deleted this session successfully", "success")
                                  dispatch(fetchSessions())

                                } 
                                else {
                                  console.error("Invalid committee ID or task ID");
                                }
setIsModalOpen(false)
                              
}

    return (
      <>
      <DeleteModal
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      isOpen={isModalOpen}
      message="Are you sure you want to delete this session?"
      />
        <div className="max-w-5xl mx-auto px-5 space-y-6">
            {sessions.slice(0, visible).map((ele) => (
                <div key={ele?.id} className="flex flex-col p-5 justify-center w-full md:2/3 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300">                    
                        <div className='flex justify-end items-end'>
                           <button
                                         onClick={()=>{
                                          handleDelete(ele?.id)
                                         }}
                                          type="button"
                                          className="text-white bg-red-700 hover:bg-red-800 rounded-full px-3 py-1.5 text-sm"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="size-5 inline" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                          </svg>
                                        </button>
                        </div>
                        <div className='relative flex justify-between items-center' >

                        <h5 className="mt-3 text-2xl font-bold text-gray-900">{ele.title}</h5>
                        <p className='text-center whitespace-pre'>{ele.date}</p>

                        </div>
                        <p className="text-gray-700 mt-2">{ele.description}</p>
                        <hr className='border-t-2 border-double border-gray-400 my-5 w-[80%] mx-auto' />
          <div className="w-full flex justify-between items-center">
                          <a href={ele.link} target='_blank' className='text-customBlue5 hover:text-customBlue4 hover:underline font-medium w-fit'>Go To Session</a>
                
                <Link
              to={`/committees/${committeeId}/edit-session-form/${ele?.id}`}
              className="flex items-center gap-2 px-5 py-1.5 bg-customBlue2 text-white font-semibold rounded-lg hover:bg-customBlue4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <span>Edit</span>
            </Link>
</div>
                </div>
            ))}

<div className=" w-full flex items-center p-5">
{visible > 9 && (
    <div className="flex justify-start items-center w-full">
    <button 
      onClick={handleViewLess} 
      className="px-5 py-2 bg-customBlue4 text-white rounded-lg hover:bg-customBlue5"
    >
      Load Less
    </button>
    </div>
  )}


  {visible < sessions.length && (
    <div className="flex justify-end items-center w-full">
    <button 
      onClick={handleViewMore} 
      className="px-5 py-2 bg-customBlue4 text-white rounded-lg hover:bg-customBlue5"
    >
      Load More
    </button>
    </div>
  )}


</div>
        </div>
              </>

    )
}
