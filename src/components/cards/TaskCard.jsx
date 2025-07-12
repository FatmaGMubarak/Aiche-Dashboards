import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask } from '../../store/reducers/taskSlice';
export default function TaskCard() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id: committeeId } = useParams(); 
const tasks = useSelector((state) => state.task?.tasks || []);
const [visible, setVisible] = useState(9);

useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);

const filteredTasks = tasks.filter(
  (task) => task.committee?.id?.toString() === committeeId?.toString()
);

if (!tasks.length) return <p className="text-center">Loading or no tasks available.</p>;


  const handleViewMore = () => setVisible((prev) => prev + 9);
  const handleViewLess = () => setVisible((prev) => (prev > 9 ? prev - 9 : prev));


  
  return (
    <div className="max-w-5xl mx-auto px-5 space-y-12">
      {filteredTasks.slice(0, visible).map((ele) => (
        <div
          key={ele?.id}
          className="flex flex-col p-5 justify-center w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 mb-6"
        >
          <div className="w-full flex justify-between items-center">
            <h5 className="text-xl font-bold text-gray-900">{ele?.title}</h5>
            <button
             onClick={async() => {
    const comm_id = committeeId;  
    const id = ele?.id;  
    if (comm_id && id) {  
      await dispatch(deleteTask({ comm_id, id })); 
      dispatch(fetchTasks())
    } else {
      console.error("Invalid committee ID or task ID");
    }
  }}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 rounded-full px-3 py-1.5 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 inline" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
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
  );
}
