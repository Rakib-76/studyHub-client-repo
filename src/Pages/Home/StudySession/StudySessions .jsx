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
            const res = await axiosPublic.get("/sessions"); // ✅ only relative path
            return res.data;
        },
    });

    const isClosed = (date) => new Date(date) < new Date();

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load sessions.</p>;

    const visibleSessions = showAll ? sessions : sessions.slice(0, 6);


    return (
        <div className=" mx-auto px-10 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
                Available Study Sessions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleSessions.map((session) => (
                    <div key={session._id} className="bg-white shadow-lg rounded-lg overflow-hidden border">
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
                    </div>
                ))}
            </div>

            {!showAll && sessions.length > 6 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => setShowAll(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Show All
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudySessions;
