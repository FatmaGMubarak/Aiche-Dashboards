import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const dashboardItems = [
  { title: "Blogs", path: "/blog-home" },
  { title: "Committees", path: "/committee-page" },
  { title: "Events", path: "/event-page" },
  { title: "Materials", path: "/material-page" },
  { title: "Awards", path: "/award-page" },
  { title: "Banners", path: "/slider-page" },
  { title: "Collections", path: "/collection-page" },
  { title: "Register Admin", path: "/register" },
  { title: "Assign Admin", path: "/assign" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

console.log(token)

  const visibleItems = user?.title === "admim"
    ? dashboardItems
    : dashboardItems.filter(item => item.title === "Committees");

  return (
    <div className="min-h-screen p-6 bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleItems.map((item) => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white shadow-md p-6 rounded-2xl border hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h2>
            <p className="text-gray-500">Manage {item.title.toLowerCase()} here.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
