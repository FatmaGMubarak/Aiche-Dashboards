// inside Slider.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { fetchBanners, deleteBanner } from "../../store/reducers/bannerSlice";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import { Modal } from "antd";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import notify from "../../hooks/Notifications";
import DeleteModal from "../confirm/DeleteModal";

export default function Slider() {
  const post = useSelector((state) => state.banner.banners);
  const loading = useSelector((state) => state.banner?.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bannerToDelete, setBannerToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === post?.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? post?.length - 1 : prev - 1));
  };

  const handleDelete =  (id) => {
    setBannerToDelete(id)
    setIsModalOpen(true)
  }

  const handleCancel  = () =>{
    setIsModalOpen(false)
  }

const handleConfirm = async () => {
  try {
    await dispatch(deleteBanner(bannerToDelete)).unwrap(); 

    notify("You deleted this banner successfully", "success");

    const newPostCount = post.length - 1;
    setCurrentIndex((prev) => {
      if (prev >= newPostCount) {
        return newPostCount > 0 ? newPostCount - 1 : 0;
      }
      return prev;
    });

    setIsModalOpen(false);
  } catch (error) {
    notify("Failed to delete the banner", "error");
  }
};


  const getPlatformIcon = (url) => {
    if (url?.includes("instagram.com")) return <FontAwesomeIcon icon={faInstagram} />;
    if (url?.includes("facebook.com")) return <FontAwesomeIcon icon={faFacebook} />;
    return <FontAwesomeIcon icon={faXTwitter} />;
  };

  const formatLink = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" />
      </div>
    );
  }

  const currentPost = post[currentIndex];

  return (
    <>
          <DeleteModal
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          isOpen={isModalOpen}
          message="Are you sure you want to delete this post?"
          />
    <div className="flex flex-col">
      <div className="mt-12 flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
        <div className="flex justify-center items-center w-full mx-auto">
          <h1 className="text-3xl text-customBlue1 text-center mb-5">Our Banners</h1>
        </div>
        <div className="flex justify-center sm:justify-end items-center">
          <Link
            to="/slider-form"
            className="flex gap-1 items-center text-white bg-customBlue3 hover:bg-customBlue2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:absolute sm:right-12"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Add Post
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-x-12 mx-2 sm:mx-0 w-[70vw] h-[50vh] mt-10">
        <button
          className="bg-[#4A616D] hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110"
          onClick={handlePrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative w-full h-full transition-transform hover:scale-105 duration-300">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-full h-full flex flex-col md:flex-row items-center gap-x-12 justify-center"
            >
              <div className="relative flex justify-center items-center">
                <div className="absolute w-[15vw] h-[15vw] bg-customBlue1 rounded-full right-0 sm:-top-16 sm:-right-12"></div>
                <div className="absolute w-[22vw] h-[22vw] bg-customBlue2 rounded-full opacity-70"></div>
                <div className="absolute w-[24vw] h-[24vw] bg-customBlue3 rounded-full opacity-30"></div>
                <img
                  className="relative w-[20vw] h-[20vw] object-fill rounded-full border-[5px] border-white"
                  src={currentPost?.image}
                  alt="post Profile"
                />
              </div>

              <div className="p-5 text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">{currentPost?.title}</h5>
                <div className="flex justify-center items-center gap-2 mb-3">
                  <span className="text-2xl">{getPlatformIcon(currentPost?.link)}</span>
                  <a
                    href={formatLink(currentPost?.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium underline transition-all duration-300"
                  >
                    View Post
                  </a>
                </div>

                
 <div className="flex justify-center gap-4 mt-4">
              <Link
                to={`/edit-slider-form/${currentPost?.id}`}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-customBlue3 rounded-md hover:bg-customBlue2 transition"
              >
                <MdOutlineModeEdit className="text-lg" />
                <span>Edit</span>
              </Link>

              <button
                onClick={()=>handleDelete(currentPost?.id)}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 transition"
              >
                <IoTrashBin className="text-lg" />
                <span>Delete</span>
              </button>
            </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="bg-[#4A616D] hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110"
          onClick={handleNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
    </>
  );
}
