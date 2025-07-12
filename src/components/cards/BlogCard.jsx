import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/reducers/blogSlice";
export default function BlogCard() {
  const blogs = useSelector((state) => state.blog?.blogs);
  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const [visible, setVisible] = useState(9);

  const handleViewMore = () => {
    setVisible((prev) => prev + 9);
  };

  const handleViewLess = () => {
    setVisible((prev) => (prev > 9 ? prev - 9 : prev));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-fit w-full">
        {loading ? (
          <div className="w-full flex justify-center items-center py-12">
            <p className="text-lg text-gray-500 animate-pulse">Loading blogs...</p>
          </div>
        ) : (
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-x-5 lg:gap-x-0 justify-center items-center p-5">
            {blogs?.slice(0, visible).map((ele, i) => (
              <div
                key={ele.id || i}
                className="max-w-sm bg-white p-2 border-2 border-white rounded-lg shadow-lg hover:shadow-2xl mb-5 hover:transition-transform hover:scale-105 duration-300 flex flex-col justify-center items-center"
              >
                <img className="rounded-t-lg h-[40vh]" src={ele.image} alt="" />
                <div className="w-full p-5 text-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {ele.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {ele.description}
                  </p>
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-customBlue2 flex justify-center items-center">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={ele.user?.image}
                          alt="Rounded avatar"
                        />
                      </div>
                    </div>
                    <Link
                      to={`/blog-page/${ele.id}`}
                      className="inline-flex items-center justify-end px-3 py-2 text-sm font-medium text-center text-white bg-customBlue3 rounded-lg hover:bg-customBlue2"
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
          </div>
        )}
      </div>

      {!loading && (
        <div className="w-full flex items-center p-5">
          {visible > 9 && (
            <div className="flex justify-start items-center w-full">
              <button
                onClick={handleViewLess}
                className="px-5 py-2 bg-customBlue6 text-white rounded-lg hover:bg-customBlue5"
              >
                Load Less
              </button>
            </div>
          )}

          {visible < blogs?.length && (
            <div className="flex justify-end items-center w-full">
              <button
                onClick={handleViewMore}
                className="px-5 py-2 bg-customBlue6 text-white rounded-lg hover:bg-customBlue5"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
