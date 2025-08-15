import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAwardById, deleteAward, fetchAwards } from "../../store/reducers/awardSlice";
import notify from "../../hooks/Notifications";
import DeleteModal from "../../components/confirm/DeleteModal";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";

export default function AwardCard() {
  const nav = useNavigate();
  const { id } = useParams();
  const award = useSelector((state) => state.award?.award);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchAwardById(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDelete = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = () => {
    dispatch(deleteAward(id));
    dispatch(fetchAwards())
    notify("You deleted this award successfully", "success");
    nav("/award-page");
  };

  return (
    <>
      <DeleteModal
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isOpen={isModalOpen}
        message="Are you sure you want to delete this award?"
      />

      <div className="flex w-full justify-center items-center min-h-screen pt-24 px-4">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-8 transition-all hover:shadow-2xl">
          <div className="flex flex-col gap-6 h-full justify-between">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-2xl font-bold text-customBlue1">
                {award?.title || "No Title Provided"}
              </h2>
              <p className="text-sm text-gray-600">{award?.date || "No Date"}</p>
            </div>

            
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {award?.description || "No Description Provided"}
            </p>

            
            <div className="flex justify-end items-center gap-4 mt-6">
              <Link
                to={`/edit-award-form/${award?.id}`}
                className="flex items-center gap-2 px-6 py-2 bg-customBlue3 text-white font-semibold rounded-lg hover:bg-customBlue2 transition"
              >
                <MdOutlineModeEdit className="text-lg" />
                <span>Edit</span>
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-6 py-2 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-900 transition"
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
