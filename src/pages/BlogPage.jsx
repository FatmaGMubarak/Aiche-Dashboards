import { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogById, deleteBlog, fetchBlogs } from "../store/reducers/blogSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import notify from "../hooks/Notifications";
import DeleteModal from '../components/confirm/DeleteModal'
import { ThreeDot } from "react-loading-indicators";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";



export default function BlogPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const blog = useSelector((state) => state.blog?.blog);
  const loading = useSelector((state) => state.blog?.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(fetchBlogById(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleConfirm = () => {
    dispatch(deleteBlog(id));
    dispatch(fetchBlogs())
    setIsModalOpen(false);
    notify("You deleted this blog successfully", "success");
    nav("/blog-home");
  };

  if (loading || !blog) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-28">
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
        message="Are you sure you want to delete this blog?"
      />

      <div className="flex w-full justify-center items-center min-h-screen pt-24 px-4">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden">
            <img
              src={blog?.image}
              alt={blog?.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-customBlue1 mb-4 leading-tight">
                {blog?.title}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {blog?.description}
              </p>
            </div>

            <div className="flex items-start mt-8 gap-4">
  <img
    src={blog?.user?.image || avatar}
    alt="Author"
    className="w-16 h-16 rounded-full border border-gray-300"
  />
  <div>
    <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Created By</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">{blog?.user?.name}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{blog?.user?.title}</p>
    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{blog?.user?.bio}</p>
    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 inline-block"><FaPhoneAlt className="inline"/>
 {blog?.user?.phone}</p>
    <a
      href={blog?.user?.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-500 hover:underline mt-1 block"
    >
      <FaLinkedinIn className="inline"/> LinkedIn
    </a>
  </div>
</div>


            <div className="mt-6 flex flex-wrap gap-4 justify-between">
              <Link
                to={`/edit-blog-form/${blog?.id}`}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-customBlue3 rounded-md hover:bg-customBlue2 transition"
              >
                <MdOutlineModeEdit className="text-lg" /> Edit
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 transition"
              >
                <IoTrashBin className="text-lg" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

