import React from "react";
// import useAxios from "../../../hooks/UseAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";


const TutorSessions = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  // ✅ Fetch all sessions for this tutor
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["tutorSessions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/sessions?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Mutation to re-request approval
  const requestApproval = useMutation({
    mutationFn: async (sessionId) => {
      const res = await axiosSecure.patch(`/sessions/request/${sessionId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tutorSessions", user.email]);
    },
  });

  if (isLoading) return <p className="text-center">Loading sessions...</p>;

  const filteredSessions = sessions.filter((s) =>
    ["approved", "rejected"].includes(s.status)
  );

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Your Study Sessions (Approved & Rejected)
      </h2>

      {filteredSessions.length === 0 ? (
        <p className="text-center text-gray-500">No sessions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <div
              key={session._id}
              className="border p-5 rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-bold mb-1">{session.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                {session.description}
              </p>
              <p
                className={`text-xs font-semibold px-2 py-1 inline-block rounded ${
                  session.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                Status: {session.status}
              </p>

              {/* Only show request button if rejected */}
              {session.status === "rejected" && (
                <button
                  onClick={() => requestApproval.mutate(session._id)}
                  className="mt-3 btn btn-sm btn-outline btn-warning"
                  disabled={requestApproval.isPending}
                >
                  {requestApproval.isPending
                    ? "Sending..."
                    : "Send Approval Request"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorSessions;
