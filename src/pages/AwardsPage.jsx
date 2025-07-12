import medal from '../assets/medal.png'
import trophy from '../assets/trophy-flat-style.png'
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { fetchAwards } from '../store/reducers/awardSlice';
import { useSelector,useDispatch } from 'react-redux';
// const awards = [
//   {
//     id: 1,
//     title: "Best Volunteer of the Year",
//     date: "April 15, 2024",
//     description: "Awarded to the student who contributed the most to community service.",
//   },
//   {
//     id: 2,
//     title: "Innovator Award",
//     date: "June 10, 2024",
//     description: "Recognizing students who developed impactful tech projects.",
//   },
//   {
//     id: 3,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 4,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 5,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 6,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 7,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 8,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 9,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 10,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 11,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
//   {
//     id: 12,
//     title: "Leadership Excellence",
//     date: "August 5, 2024",
//     description: "For outstanding leadership in student activities and organizations.",
//   },
// ];

export default function AwardsPage() {
  const awards = useSelector((state)=>state.award?.awards)
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(fetchAwards())

  },[dispatch])
    const [visible, setVisible] = useState(9)
    const handleViewMore = () =>{
        setVisible((prev)=>prev + 9)
    }
    const handleViewLess = () =>{
        setVisible((prev)=>prev > 9 ?prev - 9 :prev)
    }
  return (
    <div className="min-h-screen w-full">
      <div className="relative w-full h-[50vh] flex items-center justify-center text-white">
        <div className="bg-white text-customBlue2 p-8 text-center rounded-lg mt-10 mx-2 sm:mx-0">
        <div className='flex justify-center items-center'>

        <img src={trophy} alt="" className='w-11 h-11 inline'/>
          <h1 className="text-4xl font-bold">Aiche Awards</h1>
          </div>

          <p className="mt-2 text-lg">Recognizing our outstanding achievements and contributions.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
          <div className="flex justify-center items-center w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-customBlue3 mb-8">
             Awards List</h2>
             </div>
             <div className="flex justify-center sm:justify-end items-center">
            <button
  type="button"
  className="flex text-white bg-customBlue3 hover:bg-customBlue2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:absolute sm:right-12"
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
<Link
to={"/award-form"}
className="whitespace-nowrap">Add Award</Link>
</button>

            </div>
             </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {awards.slice(0,visible).map((award) => (
            <div key={award.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all">
                <div className='flex justify-between items-center'>
              <h3 className="text-xl font-bold text-gray-800">{award.title}</h3>
              <img src={medal} alt="" className='w-10 h-10'/>
              </div>
              <p className="text-sm text-gray-600 mt-1">{award.date}</p>
              <p className="mt-3 text-gray-700">{award.description}</p>
              <div className='flex items-center justify-end'>
              <Link
              to={`/award-card/${award.id}`}
          className="inline-flex items-center justify-end px-3 py-2 text-sm font-medium text-center text-white bg-customBlue3 rounded-lg hover:bg-customBlue2 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            
          ))}
        </div>
      </div>
      <div className=" w-full flex items-center p-5">
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


  {visible < awards.length && (
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
