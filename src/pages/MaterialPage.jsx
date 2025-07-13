import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import books from '../assets/books.png'
import block from '../assets/block.png'
import { useSelector,useDispatch } from "react-redux";
import { fetchMaterials } from "../store/reducers/materialSlice";
import { ThreeDot } from "react-loading-indicators";


const semesters =["Semester","All", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8", "Semester 9", "Semester 10",] 


export default function MaterialPage() {
  const materialsData = useSelector((state)=>state?.material?.materials)
  const loading = useSelector((state)=>state?.material?.loading)
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(fetchMaterials())
  },[dispatch])
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredMaterials = materialsData?.filter((material =>
    {
      return (
        (selectedSemester === "All" || material.semester === selectedSemester) &&
    (selectedDepartment === "All" || material.department === selectedDepartment)
      )
    })
  );

if(loading){
      return (
      <div className="flex w-full justify-center items-center min-h-screen pt-28">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
}


  return (
    <div className="min-h-screen w-full container mx-auto pt-28">
              <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:relative">
          <div className="flex justify-center items-center w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-customBlue1 mb-8">
             Materials</h2>
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
to={"/material-form"}
className="whitespace-nowrap">Add Material</Link>
</button>

            </div>
             </div>
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <select
          className="px-4 py-2 border rounded-lg bg-gray-100"
          onChange={(e) => setSelectedSemester(e.target.value)}
          defaultValue="Semester"
        >
            {semesters.map((ele, index) => {
  if (ele === "Semester") {
    return (
      <option key={index} value={ele} className="h-1" disabled>
        {ele}
      </option>
    );
  } else {
    return (
      <option key={index} value={ele} className="h-1">
        {ele}
      </option>
    );
  }
})}

        </select>

        <select
          className="px-4 py-2 border rounded-lg bg-gray-100"
          onChange={(e) => setSelectedDepartment(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>Department</option>
          <option value="All">All</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Information Technology">Information Technology</option>
        </select>
      </div>




      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-12">
        <AnimatePresence>
          {filteredMaterials?.length > 0 ? (
            filteredMaterials?.map((material, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-2xl transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{material.name}</h3>
                <p className="text-gray-600"><img src={books} alt="" className="w-5 h-5 inline" /> <b>Semester:</b> {material.semester}</p>
                <p className="text-gray-600"><img src={block} alt="" className="w-5 h-5 inline" /> <b>Department:</b> {material.department}</p>
                <a
                  href={material.link}
                  target="_blank"
                  className="mt-4 inline-block bg-customBlue3 text-white px-4 py-2 rounded-lg hover:bg-customBlue2 transition"
                >
                  View Material
                </a>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No materials found.</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
