import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../../store/reducers/eventSlice';
export default function EventCard() {
  const events = useSelector((state) => state.event?.events);
  const loading = useSelector((state) => state.event?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const [visible, setVisible] = useState(9);

  const handleViewMore = () => setVisible((prev) => prev + 9);
  const handleViewLess = () => setVisible((prev) => (prev > 9 ? prev - 9 : prev));

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5  flex justify-center items-start">
        <p className="text-lg text-gray-500 animate-pulse">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 space-y-6">
      {events?.slice(0, visible).map((ele, index) => (
        <div
          key={index}
          className="w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-transform duration-300"
        >
          <div className="p-5 flex flex-col justify-center w-full">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">{ele.start_date}</p>
              <p className="text-lg font-semibold text-gray-700">{ele.end_date}</p>
            </div>
            <h5 className="mt-3 text-2xl font-bold text-gray-900">{ele.title}</h5>
            <p className="text-gray-700 mt-2">{ele.description}</p>
            <div className="flex justify-between items-center">
              <Link to={`/event-image/${ele?.id}`} className="text-customBlue5 hover:text-customBlue4 hover:underline font-medium w-fit mt-4">
                Event Images
              </Link>
              <Link
                to={`/event-data/${ele.id}`}
                className="inline-flex items-center justify-end px-3 py-2 text-sm font-medium text-center text-white bg-customBlue2 rounded-lg hover:bg-customBlue4 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Post
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="w-full flex items-center p-5">
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

        {visible < events.length && (
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
  );
}
