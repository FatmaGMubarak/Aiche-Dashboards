import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventById, deleteEvent } from "../store/reducers/eventSlice";

export default function EventData() {
  const nav = useNavigate();
  const { id } = useParams();
  const event = useSelector((state) => state.event?.event);
  const loading = useSelector((state) => state.event?.loading); // Get loading state
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => {
    dispatch(deleteEvent(id));
    nav("/event-page");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-28 px-4">
        <p className="text-lg text-gray-500 animate-pulse">Loading event data...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen pt-28 px-4">
      <div className="relative w-full sm:max-w-6xl flex flex-col lg:flex-row bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="flex flex-col p-8 w-full h-full justify-between">
          <div>
            <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
              <p><span className="font-semibold">Start:</span> {event?.start_date}</p>
              <p><span className="font-semibold">End:</span> {event?.end_date}</p>
            </div>

            <h2 className="text-3xl font-bold text-customBlue1 mb-3">
              {event?.title || "No Title Provided"}
            </h2>

            <p className="text-gray-700 mb-6">{event?.description || "No Description"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
              <p><span className="font-semibold">Category:</span> {event?.category || "N/A"}</p>
              {
                event?.place ? (
                  <p><span className="font-semibold">Place:</span> {event?.place}</p>
                ) : null
              }
              <p>
                <span className="font-semibold">Facebook:</span>{" "}
                <a href={event?.facebookLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  View
                </a>
              </p>
              {
                event?.formLink ? (
                  <p>
                    <span className="font-semibold">Form:</span>
                    <a href={event?.formLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Register
                    </a>
                  </p>
                ) : null
              }
              <p><span className="font-semibold">Status:</span> {event?.status}</p>
            </div>
          </div>

          <div className="flex justify-end items-center mt-8 gap-4">
            <Link
              to={`/edit-event-form/${event?.id}`}
              className="flex items-center gap-2 px-6 py-2 bg-customBlue3 text-white font-semibold rounded-lg hover:bg-customBlue2 transition"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-6 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
