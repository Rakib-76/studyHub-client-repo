import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router";
import { auth } from "../../../Firebase/firebase.init";

import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const ViewBookedSessions = () => {
  const [user] = useAuthState(auth);
 const axiosSecure = UseAxiosSecure();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/bookings?studentEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // only run if user email exists
  });

  if (isLoading) return <p className="text-center">Loading booked sessions...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load bookings.</p>;

  if (bookings.length === 0)
    return <p className="text-center">You have no booked sessions yet.</p>;

  return (
    <div className="mx-auto px-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        My Booked Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border"
          >
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.sessionTitle}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{booking.sessionDescription}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600">
                  Booked
                </span>

                <Link to={`/dashboard/student/booked-sessions/${booking.sessionId}`}>
                  <button className="text-sm font-medium text-blue-600 hover:underline"
                  
                  >
                    View Details
                  </button>
                </Link>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Booked on: {new Date(booking.bookedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBookedSessions;
