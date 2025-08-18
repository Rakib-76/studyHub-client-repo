import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxios from "../../../hooks/UseAxios";
import { Link } from "react-router";

const StudySessions = () => {
  const axiosPublic = useAxios();
  const [showAll, setShowAll] = useState(false);

  const { data: sessions = [], isLoading, isError } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions"); // ✅ API call
      return res.data;
    },
  });

  const isClosed = (date) => new Date(date) < new Date();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load sessions.</p>;

  const visibleSessions = showAll ? sessions : sessions.slice(0, 8);

  return (
    <div className="mx-auto px-10 py-10">
      <h2 className="text-5xl font-bold text-center mb-8 text-black">
        Available Study Sessions
      </h2>

      {/* Grid with 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleSessions.map((session) => (
          <div
            key={session._id}
            className="bg-white shadow-md rounded-lg overflow-hidden relative "
          >
            {/* Gradient border only right and bottom */}
            <div className="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500"></div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {session.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {session.description}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isClosed(session.registrationEnd)
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {isClosed(session.registrationEnd) ? "Closed" : "Ongoing"}
                </span>

                <Link to={`/sessions/${session._id}`}>
                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    Read More
                  </button>
                </Link>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Registration ends:{" "}
                {format(new Date(session.registrationEnd), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show All button */}
      {!showAll && sessions.length > 8 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] text-black font-medium rounded hover:bg-blue-700 transition"
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
};

export default StudySessions;
