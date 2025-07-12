import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchCommittee } from '../store/reducers/committeeSlice';
import { fetchAdmins, assignAdminToCommittee } from '../store/reducers/adminSlice';
import notify from '../hooks/Notifications';

export default function AdminAssignmentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admim = useSelector((state) => state.auth.admim);
  const admins = useSelector((state) => state.admin.admins || []);
  const committees = useSelector((state) => state.committee.committees || []);

  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (!admim) {
      notify("Unauthorized", "error")
    }
  }, [admim, navigate]);

  useEffect(() => {
    dispatch(fetchAdmins());
    dispatch(fetchCommittee());
  }, [dispatch]);

  const handleAssign = async () => {
    if (!selectedAdmin || !selectedCommittee) {
      alert("Please select both admin and committee.");
      return;
    }

    try {
      await dispatch(assignAdminToCommittee({
        adminId: selectedAdmin,
        committeeId: selectedCommittee,
      })).unwrap();

      setSuccessMsg("Admin successfully assigned!");
    } catch (error) {
      console.error("Assignment error:", error);
      setSuccessMsg("Failed to assign admin.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-28">
      <h1 className="text-3xl font-bold mb-6">Assign Admin to Committee</h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Admin:</label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={selectedAdmin || ""}
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

      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Committee:</label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={selectedCommittee || ""}
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

      <button
        onClick={handleAssign}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Assign
      </button>

      {successMsg && <p className="mt-4 text-green-600 font-semibold">{successMsg}</p>}
    </div>
  );
}
