import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommitteeById, deleteCommittee } from "../store/reducers/committeeSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteModal from '../components/confirm/DeleteModal';
import notify from "../hooks/Notifications";
import { ThreeDot } from "react-loading-indicators";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";

export default function CommitteePage() {
  const committee = useSelector((state) => state.committee?.committee);
  const loading = useSelector((state) => state.committee.loading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    if (id) dispatch(fetchCommitteeById(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    dispatch(deleteCommittee(id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        notify("You deleted this committee successfully", "success");
        nav("/committee-page");
      } else {
        console.error("Failed to delete:", res.payload);
      }
    });
  };

  if (loading || !committee) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-28">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <>
      <DeleteModal
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isOpen={isModalOpen}
        message="Are you sure you want to delete this committee?"
      />

      <div className="flex w-full justify-center items-center min-h-screen pt-24 px-4">
        <div className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden">
            <img
              src={committee?.img}
              alt={committee?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full lg:w-3/5 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-customBlue1 mb-4 leading-tight">
                {committee?.name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                {committee?.description}
              </p>
              {committee?.admins?.length > 0 && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
      Committee Admins
    </h2>
    <div className="flex flex-wrap gap-4">
      {committee?.admins.map((admin) => (
        <div
          key={admin.id}
          className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200 w-full sm:w-auto"
        >
          {/* <img
            src={admin.avatar || "/default-avatar.png"}
            alt={admin.name}
            className="w-12 h-12 rounded-full object-cover"
          /> */}
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{admin.name}</p>
            {/* <p className="text-xs text-gray-600 dark:text-gray-400">{admin.email}</p> */}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-between">
              <Link
                to={`/edit-committee-form/${committee?.id}`}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-customBlue3 rounded-md hover:bg-customBlue2 transition"
              >
                <MdOutlineModeEdit className="text-lg" />
                <span>Edit</span>
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-red-700 rounded-md hover:bg-red-800 transition"
              >
                <IoTrashBin className="text-lg" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
