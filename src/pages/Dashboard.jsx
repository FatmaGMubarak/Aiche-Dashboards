import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowRight } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import { getProfile } from "../store/reducers/userSlice";

const dashboardItems = [
  { title: "Blogs", path: "/blog-home" },
  { title: "Committees", path: "/committee-page" },
  { title: "Events", path: "/event-page" },
  { title: "Materials", path: "/material-page" },
  { title: "Awards", path: "/award-page" },
  { title: "Banners", path: "/slider-page" },
  { title: "Products", path: "/product-page" },
  { title: "Collections", path: "/collection-page" },
  { title: "Register Admin", path: "/register" },
  { title: "Assign Admin", path: "/assign" },
  { title: "Pending Requests", path: "/request" },
  { title: "Members", path: "/member-page" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const current = useSelector((state) => state.user?.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getProfile())
  }, [dispatch, token])
  const adminCommittees = current?.committees;

if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Loading dashboard...
      </div>
    );
  }

  const visibleItems =
    // user?.title === "Super Admin"
    user?.is_super_admin === "1"
      ? dashboardItems
      : dashboardItems.filter((item) =>
          ["Committees", "Pending Requests", "Members"].includes(item.title)
        );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-6 pt-24">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Admin Dashboard
      </h1>

      
      {user?.is_super_admin !== "1" && adminCommittees?.length > 0 && (
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-xl mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaUsers className="text-customBlue3" /> Your Committees
          </h2>
          <div className="flex flex-wrap gap-4">
            {adminCommittees.map((committee, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium shadow-sm hover:bg-indigo-200 transition"
              >
                {committee.name}
              </div>
            ))}
          </div>
        </div>
      )}

      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {visibleItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="group cursor-pointer bg-white/70 backdrop-blur-md shadow-lg p-6 rounded-2xl border border-gray-200 hover:scale-[1.02] transition-transform hover:shadow-xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h2>
              <FiArrowRight className="text-gray-500 group-hover:text-indigo-600 transition" />
            </div>
            <p className="text-sm text-gray-600">
              Manage <span className="font-medium">{item.title.toLowerCase()}</span> here.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
