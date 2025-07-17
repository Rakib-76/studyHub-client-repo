import React, { useEffect, useState } from "react";
import UseAuth from "../../../Hook/UseAuth";
// import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const StudentStudyMaterials = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [bookedSessions, setBookedSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch student's booked sessions
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookings?email=${user.email}`)
        .then((res) => setBookedSessions(res.data))
        .catch((err) => {
          console.error("Error loading booked sessions:", err);
          Swal.fire("Error", "Failed to load booked sessions", "error");
        });
    }
  }, [user?.email, axiosSecure]);

  // ✅ Fetch materials when session is selected
  useEffect(() => {
    if (selectedSessionId) {
      setLoading(true);
      axiosSecure
        .get(`/materials/${selectedSessionId}`)
        .then((res) => {
          setMaterials(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading materials:", err);
          Swal.fire("Error", "Failed to load materials", "error");
          setLoading(false);
        });
    }
  }, [selectedSessionId, axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Your Study Materials
      </h2>

      {/* ✅ Booked Sessions List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {bookedSessions.map((session) => (
          <div
            key={session.sessionId}
            onClick={() => setSelectedSessionId(session.sessionId)}
            className={`p-4 border rounded shadow bg-white cursor-pointer hover:border-blue-500 transition ${
              selectedSessionId === session.sessionId ? "border-blue-600" : ""
            }`}
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {session.sessionTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {session.sessionDescription?.slice(0, 60)}...
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Show Materials */}
      {selectedSessionId && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Materials for Selected Session
          </h3>

          {loading ? (
            <p className="text-gray-500">Loading materials...</p>
          ) : materials.length === 0 ? (
            <p className="text-gray-500">
              No materials uploaded yet for this session.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="border rounded p-4 bg-white shadow-sm flex flex-col items-center"
                >
                  {/* ✅ Image preview */}
                  {material.imageUrl ? (
                    <>
                      <img
                        src={material.imageUrl}
                        alt="Material"
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <a
                        href={material.imageUrl}
                        download
                        className="btn btn-sm btn-outline btn-primary mb-2"
                      >
                        Download Image
                      </a>
                    </>
                  ) : (
                    <p className="text-gray-400">No image uploaded.</p>
                  )}

                  {/* ✅ Drive link */}
                  {material.driveLink ? (
                    <a
                      href={material.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Google Drive Link
                    </a>
                  ) : (
                    <p className="text-gray-400">No drive link provided.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentStudyMaterials;
