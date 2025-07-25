import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../../store/reducers/taskSlice';
import DeleteModal from '../../components/confirm/DeleteModal'
import notify from '../../hooks/Notifications';
import { ThreeDot } from 'react-loading-indicators';
import { FiTrash2 } from 'react-icons/fi';


export default function TaskCard() {
  const dispatch = useDispatch();
  const { id: committeeId } = useParams(); 
const tasks = useSelector((state) => state.task?.tasks);
const loading = useSelector((state)=>state.task?.loading)
const [visible, setVisible] = useState(9);
const [isModalOpen, setIsModalOpen] = useState(false)
const [taskToDelete, setTaskToDelete] = useState(null)

useEffect(() => {
  dispatch(fetchTasks());
  console.log(tasks)
}, [dispatch]);

const filteredTasks = tasks.filter(
  (task) => task.committee?.id?.toString() === committeeId?.toString()
);

  const handleViewMore = () => setVisible((prev) => prev + 9);
  const handleViewLess = () => setVisible((prev) => (prev > 9 ? prev - 9 : prev));

  const handleDelete = (id) =>{
    setTaskToDelete(id)
    setIsModalOpen(true)
  }

  const handleConfirm = () =>{
    const comm_id = committeeId;  
    const id = taskToDelete;  
    if (comm_id && id) {  
       dispatch(deleteTask({ comm_id, id })); 
      notify("You deleted this task successfully", "success")
      dispatch(fetchTasks())
    } else {
      console.error("Invalid committee ID or task ID");
    }
    setIsModalOpen(false)
  }
  
const handleCancel = () =>{
  setIsModalOpen(false)
}
  
if(loading){
      return (
      <div className="max-w-5xl mx-auto px-5  flex justify-center items-start">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
}
if (!filteredTasks.length) return <p className="text-center text-lg">no tasks available.</p>;


    return (
    <>
    <DeleteModal
    onCancel={handleCancel}
    onConfirm={handleConfirm}
    isOpen={isModalOpen}
    message="Are you sure you want to delete this task?"
    />
    <div className="max-w-5xl mx-auto px-5 space-y-12">
      {filteredTasks.slice(0, visible).map((ele) => (
        <div
          key={ele?.id}
          className="flex flex-col p-5 justify-center w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 mb-6"
        >
          <div className="w-full flex justify-between items-center relative">
            <h5 className="text-xl font-bold text-gray-900">{ele?.title}</h5>
             <button
                        onClick={() => handleDelete(ele?.id)}
                        className="absolute top-2 right-2 p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                        title="Delete"
                      >
                        <FiTrash2 size={20} />
                      </button>
          </div>
          <p className="text-gray-700 mt-2">{ele?.description}</p>
          <hr className="my-5 border-t-2 border-gray-300" />
          <div className="w-full flex justify-between items-center">
            <a
              href={ele?.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-customBlue5 hover:text-customBlue4 hover:underline font-medium"
            >
              Go To Task
            </a>
            <Link
              to={`/committees/${committeeId}/edit-task-form/${ele?.id}`}
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

      <div className="flex justify-between items-center p-5">
        {visible > 9 && (
          <button onClick={handleViewLess} className="px-5 py-2 bg-customBlue4 text-white rounded-lg hover:bg-customBlue5">
            Load Less
          </button>
        )}
        {visible < filteredTasks.length && (
          <button onClick={handleViewMore} className="px-5 py-2 bg-customBlue4 text-white rounded-lg hover:bg-customBlue5">
            Load More
          </button>
        )}
      </div>
    </div>
    </>
  );
}
