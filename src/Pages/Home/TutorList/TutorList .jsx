import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/UseAxios";

const TutorList = () => {
  const axiosPublic = useAxios();

  const { data: tutors = [], isLoading, isError } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users?tutor=true"); // backend must support this query param
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading tutors...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load tutors.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">All Tutors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.length === 0 ? (
          <p className="text-center col-span-full">No tutors found.</p>
        ) : (
          tutors.map((tutor) => (
            <div key={tutor._id} className="bg-white p-5 rounded shadow-md border">
              {/* Assuming tutor.photoURL is a profile image URL */}
              {tutor.photoURL && (
                <img
                  src={tutor.photoURL}
                  alt={tutor.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 text-center">{tutor.name}</h3>
              <p className="text-gray-600 text-center">{tutor.email}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TutorList;
