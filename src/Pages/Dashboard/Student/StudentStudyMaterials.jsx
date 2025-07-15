import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const StudentStudyMaterials = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [bookedSessions, setBookedSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [materials, setMaterials] = useState([]);

  // Fetch student's booked sessions
  useEffect(() => {
    axiosSecure.get(`/bookings?email=${user.email}`).then((res) => {
      setBookedSessions(res.data);
    });
  }, [user.email, axiosSecure]);

  // Fetch materials when a session is selected
  useEffect(() => {
    if (selectedSessionId) {
      axiosSecure.get(`/materials/${selectedSessionId}`).then((res) => {
        setMaterials(res.data);
      });
    }
  }, [selectedSessionId, axiosSecure]);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Study Materials</h2>

      {/* Show Booked Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {bookedSessions.map((session) => (
          <div
            key={session.sessionId}
            className={`p-4 border rounded shadow cursor-pointer bg-white ${
              selectedSessionId === session.sessionId ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedSessionId(session.sessionId)}
          >
            <h3 className="font-semibold">{session.sessionTitle}</h3>
            <p className="text-sm text-gray-500">{session.sessionDescription?.slice(0, 60)}...</p>
          </div>
        ))}
      </div>

      {/* Show Materials */}
      {selectedSessionId && (
        <>
          <h3 className="text-xl font-semibold mb-4">Materials for selected session:</h3>
          {materials.length === 0 ? (
            <p className="text-gray-500">No materials uploaded yet for this session.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="border p-3 rounded shadow bg-white flex flex-col items-center"
                >
                  <img
                    src={material.imageUrl}
                    alt="Material"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <a
                    href={material.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mb-2"
                  >
                    View Google Drive Link
                  </a>
                  <a
                    href={material.imageUrl}
                    download
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Download Image
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentStudyMaterials;
