import { useEffect, useState } from "react";
import {  motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { useSelector,useDispatch } from "react-redux";
import { fetchBanners } from "../../store/reducers/bannerSlice";
import { Link } from "react-router-dom";


export default function Slider() {
  const post = useSelector((state)=>state.banner.banners)
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(fetchBanners())
  }, [dispatch])
 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === post?.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? post?.length - 1 : prev - 1));
  };
  const getPlatformIcon = (url) => {
    if (url?.includes("instagram.com")) return <FontAwesomeIcon icon={faInstagram} />;
    if (url?.includes("facebook.com")) return <FontAwesomeIcon icon={faFacebook}/>;
    return <FontAwesomeIcon icon={faXTwitter}/>;
  };
  const formatLink = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };
  
  return (
    <div className="flex flex-col">
    <div className="mt-12 flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
    <div className="flex justify-center items-center w-full mx-auto">
  <h1 className="text-3xl text-customBlue1 text-center mb-5">Our Blogs</h1>
  </div>
  <div className="flex justify-center sm:justify-end items-center">
  <button
type="button"
className="flex text-white bg-customBlue2 hover:bg-customBlue4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:absolute sm:right-12"
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<Link
to={"/slider-form"}
className="whitespace-nowrap">Add Post</Link>
</button>

  </div>
  </div>
    <div className="flex flex-col sm:flex-row justify-center items-center gap-x-12 mx-2 sm:mx-0  w-[70vw] h-[50vh] mt-10">
      <button
        className="bg-[#4A616D] hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110"
        onClick={handlePrev}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative w-full h-full  transition-transform hover:scale-105 duration-300">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute w-full h-full bg-none rounded-lg  flex flex-col md:flex-row items-center gap-x-12 justify-center"
          >
<div className="relative flex justify-center items-center">
  <div className="absolute w-[15vw] h-[15vw] bg-customBlue1 rounded-full right-0  sm:-top-16 sm:-right-12"></div>
  <div className="absolute w-[22vw] h-[22vw] bg-customBlue2 rounded-full opacity-70"></div>
  <div className="absolute w-[24vw] h-[24vw] bg-customBlue3 rounded-full opacity-30"></div>

  <img 
    className="relative w-[20vw] h-[20vw] object-fill rounded-full border-[5px] border-white" 
    src={post[currentIndex]?.image} 
    alt="post Profile" 
  />
</div>            <div className="p-5 text-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">{post[currentIndex]?.title}</h5>
              <div className="flex justify-center items-center gap-2">
  <span className="text-2xl">{getPlatformIcon(post[currentIndex]?.link)}</span>
  <a
    href={formatLink(post[currentIndex]?.link)}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 font-medium underline transition-all duration-300"
  >
    View Post
  </a>
</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="bg-[#4A616D] hover:bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110"
        onClick={handleNext}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    </div>
  );
}
