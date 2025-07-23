import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, deleteEvent } from "../store/reducers/eventSlice";
import notify from "../hooks/Notifications";
import DeleteModal from "../components/confirm/DeleteModal";
import { ThreeDot } from "react-loading-indicators";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";

export default function EventData() {
  const nav = useNavigate();
  const { id } = useParams();
  const event = useSelector((state) => state.event?.event);
  const loading = useSelector((state) => state.event?.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    dispatch(deleteEvent(id));
    notify("You deleted this event successfully", "success");
    nav("/event-page");
  };

  if (loading) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen pt-28 px-4">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      <DeleteModal
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isOpen={isModalOpen}
        message="Are you sure you want to delete this event?"
      />

      <div className="flex w-full justify-center items-center min-h-screen pt-24 px-4">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl p-8">
          <div className="flex flex-col gap-6 h-full justify-between">
            
            <div className="flex flex-col sm:flex-row justify-between items-start text-sm text-gray-600">
              <p>
                <span className="font-semibold">Start:</span> {event?.start_date}
              </p>
              <p>
                <span className="font-semibold">End:</span> {event?.end_date}
              </p>
            </div>

           
            <div>
              <h2 className="text-3xl font-bold text-customBlue1 mb-2">
                {event?.title || "No Title Provided"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                {event?.description || "No Description"}
              </p>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-200">
              <p>
                <span className="font-semibold">Category:</span> {event?.category || "N/A"}
              </p>
              {event?.place && (
                <p>
                  <span className="font-semibold">Place:</span> {event?.place}
                </p>
              )}
              {event?.facebookLink && (
                <p>
                  <span className="font-semibold">Facebook:</span>{" "}
                  <a
                    href={event?.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View
                  </a>
                </p>
              )}
              {event?.formLink && (
                <p>
                  <span className="font-semibold">Form:</span>{" "}
                  <a
                    href={event?.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Register
                  </a>
                </p>
              )}
              <p>
                <span className="font-semibold">Status:</span> {event?.status || "N/A"}
              </p>
            </div>

            
            <div className="flex justify-end items-center gap-4 mt-6">
              <Link
                to={`/edit-event-form/${event?.id}`}
                className="flex items-center gap-2 px-6 py-2 bg-customBlue3 text-white font-semibold rounded-lg hover:bg-customBlue2 transition"
              >
                <MdOutlineModeEdit className="text-lg" />
                <span>Edit</span>
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition"
              >
                <IoTrashBin className="text-lg" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
