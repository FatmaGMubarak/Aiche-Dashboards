import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { pendingRequests, approveRequest, rejectRequest } from "../store/reducers/adminSlice";
import notify from "../hooks/Notifications";
import { ThreeDot } from "react-loading-indicators";

export default function RequestsPage() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.admin?.members || []);
  const loadingPage = useSelector((state) => state.admin?.loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      setLoading(true);
      await dispatch(pendingRequests(formData)).unwrap();
      notify("Access granted. Showing pending requests.", "success");
      setVerified(true);
    } catch (err) {
      notify("Verification failed. Please check your credentials.", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = async ( user, committee) => {
    const formData = new FormData();
    formData.append("user_id", user);
    formData.append("committee_id", committee);

    try {
      setLoading(true);
      await dispatch(approveRequest(formData)).unwrap();
      notify("Request has been aproved", "success");
    } catch (err) {
      notify("Approval failed.", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleReject = async ( user, committee) => {
    const formData = new FormData();
    formData.append("user_id", user);
    formData.append("committee_id", committee);

    try {
      setLoading(true);
      await dispatch(rejectRequest(formData)).unwrap();
      notify("Request has been declined", "success");
    } catch (err) {
      notify("Rejection failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const pendingMembers = members.filter((member) => member.status === "inactive");

        if(loadingPage){
          return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }


  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 pt-24">
        <form
          onSubmit={handleVerify}
          className="bg-white shadow-md p-8 rounded-xl w-full max-w-md border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-center text-customBlue1 mb-6">
            Admin Verification
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-customBlue3 text-white font-semibold py-2 px-4 rounded-md hover:bg-customBlue2 transition"
          >
            {loading ? "Verifying..." : "Verify and View Requests"}
          </button>
        </form>
      </div>
    );
  }


  
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-customBlue1 text-center mb-8">
          Pending Membership Requests
        </h1>

        {pendingMembers.length === 0 ? (
          <p className="text-center text-gray-600">No pending requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h2 className="text-lg font-bold text-gray-800">{member.name}</h2>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>

                <div className="flex gap-4">
                  <button className="bg-customBlue3 hover:bg-customBlue2 text-white font-semibold px-4 py-2 rounded-md transition"
                  onClick={() => handleApprove(member.id, member.committee_id)}
                  >
                    Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition"
                  onClick={()=> handleReject(member.id, member.committee_id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
