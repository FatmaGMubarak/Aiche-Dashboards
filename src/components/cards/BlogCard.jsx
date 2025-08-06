import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/reducers/blogSlice";
import { ThreeDot } from "react-loading-indicators";

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

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5  flex justify-center items-start">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">

          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-5 py-5">
            {blogs?.slice(0, visible).map((ele, i) => (
              <div
                key={ele.id || i}
                className="w-full max-w-sm bg-white p-2 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
              >
                <img
                  className="rounded-t-lg h-[200px] object-cover w-full"
                  src={ele.image}
                  alt={ele.title}
                />
                <div className="w-full p-4 text-center flex flex-col justify-between flex-grow">
                  <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                    {ele.title}
                  </h5>
                  <p className="mb-4 text-gray-700 dark:text-gray-400 text-sm line-clamp-3">
                    {ele.description}
                  </p>
                  <div className="mt-auto w-full flex justify-between items-center">
                    <div>
                      <img src={ele.user?.image} alt=""  className="w-10 h-10 bg-cover rounded-full"/>
                    </div>
                    <Link
                      to={`/blog-page/${ele.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-customBlue3 rounded-lg hover:bg-customBlue2"
                    >
                      View Post
                      <svg
                        className="w-3.5 h-3.5 ml-2"
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
      
      </div>

      {!loading && (
        <div className="w-full flex flex-col sm:flex-row justify-between items-center px-5 py-4 gap-4">
          {visible > 9 && (
            <button
              onClick={handleViewLess}
              className="px-5 py-2 bg-customBlue6 text-white rounded-lg hover:bg-customBlue5 w-full sm:w-auto"
            >
              Load Less
            </button>
          )}
          {visible < blogs?.length && (
            <button
              onClick={handleViewMore}
              className="px-5 py-2 bg-customBlue6 text-white rounded-lg hover:bg-customBlue5 w-full sm:w-auto"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
}
