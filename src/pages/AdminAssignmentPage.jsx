import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchCommittee } from '../store/reducers/committeeSlice';
import { fetchAdmins, assignAdminToCommittee, removeAdminFromCommittee } from '../store/reducers/adminSlice';
import notify from '../hooks/Notifications';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { ThreeDot } from 'react-loading-indicators';
import { getProfile } from '../store/reducers/userSlice';

export default function AdminAssignmentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const superAdmin = useSelector((state) => state.auth.superAdmin);
  const admins = useSelector((state) => state.admin?.admins || []);
  const loading = useSelector((state) => state.admin.loading);
  const committees = useSelector((state) => state.committee.committees || []);
  // const user = useSelector((state)=>state.user?.user)
const user = JSON.parse(localStorage.getItem("user"));
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const [expandedCommitteeId, setExpandedCommitteeId] = useState(null);


  useEffect(()=>{
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    if (user.is_super_admin !== '1') {
      notify("Unauthorized", "error");
      navigate("/");
    }
  }, [superAdmin, navigate]);

  useEffect(() => {
    dispatch(fetchAdmins());
    dispatch(fetchCommittee());
  }, [dispatch]);

  const handleAssign = async () => {
    if (!selectedAdmin || !selectedCommittee) {
      notify("Please select both admin and committee.", "error");
      return;
    }

    try {
      await dispatch(assignAdminToCommittee({
        adminId: selectedAdmin,
        committeeId: selectedCommittee,
      })).unwrap();

      notify("Admin successfully assigned!", "success");
    } catch (error) {
      notify("Failed to assign admin.", "error");
    }
  };

  const handleRemove = async (adminId, committeeId) => {
    try {

      await dispatch(removeAdminFromCommittee({ adminId, committeeId })).unwrap();
      notify("Admin successfully removed from committee", "success");
      dispatch(fetchCommittee())
    } catch (error) {
      notify("Failed to remove admin.", "error");
    }
  };

  const toggleCommittee = (id) => {
    setExpandedCommitteeId((prev) => (prev === id ? null : id));
  };

        if(loading){
          return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }


  return (
    <div className="max-w-5xl mx-auto p-10 pt-24">
      <h1 className="text-4xl font-bold text-center mb-10 text-customBlue1">Manage Committee Admins</h1>

      <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Assign Admin to Committee</h2>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700">Select Admin:</label>
            <select
              className="w-full border border-gray-300 px-4 py-2 rounded"
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(Number(e.target.value))}
            >
              <option value="">-- Choose Admin --</option>
              {admins.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name} ({admin.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Select Committee:</label>
            <select
              className="w-full border border-gray-300 px-4 py-2 rounded"
              value={selectedCommittee}
              onChange={(e) => setSelectedCommittee(Number(e.target.value))}
            >
              <option value="">-- Choose Committee --</option>
              {committees.map((committee) => (
                <option key={committee.id} value={committee.id}>
                  {committee.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleAssign}
          className="bg-customBlue3 text-white px-6 py-2 rounded hover:bg-customBlue2 transition"
        >
          Assign Admin
        </button>
      </div>

     
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Committees & Admins</h2>
        {committees.map((committee) => (
          <div key={committee.id} className="mb-4 border-b border-gray-200 pb-4">
            <div className=' flex items-center justify-between '>
            <button
              onClick={() => toggleCommittee(committee.id)}
              className="w-full text-left font-semibold text-customBlue1 text-lg hover:underline transition"
            >
              {committee.name}
            </button>
            {expandedCommitteeId === committee.id ?<FaCaretUp /> : <FaCaretDown/>}
</div>
            <AnimatePresence>
              {expandedCommitteeId === committee.id && (
                <motion.div
                  key="adminList"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  {committee.admins?.length > 0 ? (
                    <ul className="space-y-2">
                      {committee.admins?.map((admin, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded shadow-sm">
                          <span className="font-medium text-gray-700">{admin?.name}</span>
                          {admin?.name !== user.name ? <button
                            onClick={() => handleRemove(admin.profile.id, committee.id)}
                            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Remove
                          </button> :``}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic block">No admins assigned.</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
