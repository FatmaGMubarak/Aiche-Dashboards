import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMembers } from "../store/reducers/adminSlice";
import { UserIcon, MailIcon, UsersIcon } from "lucide-react";
import { ThreeDot } from "react-loading-indicators";

export default function MembersPage() {
  const members = useSelector((state) => state.admin?.users);
  const loading = useSelector((state) => state.admin?.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

      if(loading){
          return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ThreeDot color="#05284B" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-8 py-20 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-customBlue2 mb-10 text-center flex items-center justify-center gap-3">
          <UsersIcon className="w-8 h-8 text-customBlue3" />
          Committee Members Overview
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <UserIcon className="w-6 h-6 text-indigo-500" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MailIcon className="w-4 h-4" />
                {member.email}
              </div>
              <div className="text-sm text-gray-500 mb-2">
                Committee ID: <span className="font-medium">{member.committee_id}</span>
              </div>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                  member.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {member.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
