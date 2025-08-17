import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxios from "../../../hooks/UseAxios";
import { Link } from "react-router";
import { motion } from "framer-motion";

const StudySessions = () => {
  const axiosPublic = useAxios();
  const [showAll, setShowAll] = useState(false);

  const { data: sessions = [], isLoading, isError } = useQuery({
    queryKey: ["studySessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions");
      return res.data;
    },
  });

  const isClosed = (date) => new Date(date) < new Date();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load sessions.</p>;

  // Filter only approved sessions here
  const approvedSessions = sessions.filter(session => session.status === "approved");

  const visibleSessions = showAll ? approvedSessions : approvedSessions.slice(0, 6);

  return (
    <div className="mx-auto px-10 py-10 ">
      <h2 className="text-3xl font-bold text-center mb-8">
        Available Study Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {visibleSessions.map((session) => (
          <motion.div
            key={session._id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative bg-white shadow-lg overflow-hidden ">

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{session.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{session.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${isClosed(session.registrationEnd)
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
                Registration ends: {format(new Date(session.registrationEnd), "MMM dd, yyyy")}
              </p>
            </div>
            {/* bottom border */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500"></div>
            {/* right border */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-400 via-yellow-400 to-pink-500"></div>
          </motion.div>
        ))}
      </div>

      {!showAll && approvedSessions.length > 6 && (
        <div className="text-center mt-8">
          <motion.button
            onClick={() => setShowAll(true)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="px-6 py-2 bg-gradient-to-r from-[#B4E50D] to-[#FF9B2F] text-black font-medium rounded hover:bg-blue-700 transition"
          >
            Show All
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default StudySessions;
