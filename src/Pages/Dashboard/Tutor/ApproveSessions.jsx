import React, { useEffect, useState } from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";
import UploadMaterials from "./UploadMaterials ";

const ApproveSessions = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/tutor/sessions/approved?email=${user.email}`)
        .then((res) => {
          setSessions(res.data || []);
        })
        .catch((err) => {
          console.error("Error fetching sessions:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  if (loading) return <p className="text-center">Loading approved sessions...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Approved Study Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center text-red-500">No approved sessions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div key={session._id} className="border p-4 rounded bg-white shadow">
              <h3 className="text-xl font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{session.description}</p>
              <p className="text-sm font-medium">Status: {session.status}</p>
              <button
                className="btn btn-sm btn-outline btn-primary mt-2"
                onClick={() => setSelectedSessionId(session._id)}
              >
                Upload Materials
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show Upload Form when a session is selected */}
      {selectedSessionId && (
        <div className="mt-10 border-t pt-6">
          <UploadMaterials sessionId={selectedSessionId} />
        </div>
      )}
    </div>
  );
};

export default ApproveSessions;
