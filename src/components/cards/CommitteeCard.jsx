import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import session from '../../assets/organization.png'
import { useSelector,useDispatch } from "react-redux";
import { fetchCommittee } from "../../store/reducers/committeeSlice";
import task from "../../assets/task-done.png"
import { ThreeDot } from "react-loading-indicators";
// import { requestToJoin } from "../../store/reducers/userSlice";
import notify from "../../hooks/Notifications";

export default function CommitteeCard() {
  const {id} = useParams()
  const nav = useNavigate()
  const committees = useSelector((state)=>state.committee?.committees)
  const loading = useSelector((state)=>state.committee.loading)
  const dispatch = useDispatch()
  // const user = useSelector((state)=>state.auth?.user)
  useEffect(()=>{
    dispatch(fetchCommittee())
  }, [ dispatch])
    const [visible, setVisible] = useState(9)
const handleViewMore = () =>{
    setVisible((prev)=>prev + 9)
}
const handleViewLess = () =>{
    setVisible((prev)=>prev > 9 ?prev - 9 :prev)
}

// const handleJoinCommittee = (committeeId) => {
//   dispatch(requestToJoin( committeeId))
//   notify("You request has been sent successfully", "success")
//   nav("/committee-page")
// };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-5  flex justify-center items-start">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }
  return (
    <>
  <div className="min-h-screen flex flex-col justify-center items-center w-full  py-10">
  <div className="w-full max-w-7xl grid gap-6 sm:grid-cols-2 md:grid-cols-3 px-5">
{committees?.slice(0, visible).map((ele) => (
  <div
    key={ele.id}
    onClick={() => nav(`/committee-data/${ele?.id}`)}
    className="relative bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden flex flex-col h-[400px] group"
  >
    <img
      src={ele.img}
      alt=""
      className="w-full h-64 object-cover"
    />
    <div className="flex flex-col justify-between flex-grow p-4 text-center">
      <div>
        <h5 className="mb-2 text-xl font-bold text-gray-900">{ele.name}</h5>
        <p className="text-gray-600 text-sm">{ele.description}</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            nav(`/committees/${ele?.id}/session-page`);
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-customBlue3 text-white text-sm font-medium rounded-lg hover:bg-customBlue2"
        >
          <img src={session} alt="session" className="w-5 h-5" />
          Sessions
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nav(`/committees/${ele?.id}/task-page`);
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-customBlue3 text-white text-sm font-medium rounded-lg hover:bg-customBlue2"
        >
          <img src={task} alt="task" className="w-5 h-5" />
          Tasks
        </button>
      </div>
    </div>

    
    {/* {user?.title === "admin" && (
      <div
        className="absolute top-0 right-0 justify-center items-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => handleJoinCommittee(ele?.id)}
          className="bg-white text-customBlue3 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100"
        >
          Request to Join
        </button>
      </div>
    )} */}
  </div>
))}

  </div>

  <div className="flex justify-between w-full max-w-7xl px-5 mt-8">
    {visible > 9 && (
      <button
        onClick={handleViewLess}
        className="px-5 py-2 bg-customBlue4 text-white rounded-lg hover:bg-customBlue5"
      >
        Load Less
      </button>
    )}
    {visible < committees?.length && (
      <button
        onClick={handleViewMore}
        className="ml-auto px-5 py-2 bg-customBlue4 text-white rounded-lg hover:bg-customBlue5"
      >
        Load More
      </button>
    )}
  </div>
</div>

    </>
  )
}
