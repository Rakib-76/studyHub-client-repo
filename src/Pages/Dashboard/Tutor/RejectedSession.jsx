import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const RejectedSessions = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [rejectedSessions, setRejectedSessions] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/tutor/sessions?email=${user.email}`)
      .then((res) => {
        const rejected = res.data.filter((session) => session.status === "rejected");
        setRejectedSessions(rejected);
      })
      .catch((err) => console.error("Failed to fetch tutor sessions:", err));
  }, [user.email, axiosSecure]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Rejected Study Sessions</h2>

      {rejectedSessions.length === 0 ? (
        <p className="text-center text-gray-500">You have no rejected sessions.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rejectedSessions.map((session) => (
            <div key={session._id} className="bg-white border border-red-300 rounded p-4 shadow">
              <h3 className="text-lg font-semibold text-red-600 mb-2">{session.title}</h3>
              <p className="text-sm mb-1 text-gray-700">
                <strong>Description:</strong> {session.description}
              </p>
              <p className="text-sm text-red-700">
                <strong>Rejection Reason:</strong> {session.rejectionReason}
              </p>
              <p className="text-sm text-red-500">
                <strong>Feedback:</strong> {session.rejectionFeedback}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RejectedSessions;
