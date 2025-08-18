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
    <div className="max-w-8xl mx-auto p-10">
      <h2 className="text-5xl font-bold text-center mb-8 text-black">All Tutors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutors.length === 0 ? (
          <p className="text-center col-span-full">No tutors found.</p>
        ) : (
          tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white p-5 rounded shadow-md transition-all duration-300 transform hover:scale-105 hover:bg-[#EAECED] hover:text-white cursor-pointer"
            >
              {/* Tutor Image */}
              {tutor.photoURL && (
                <img
                  src={tutor.photoURL}
                  alt={tutor.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4 transition-transform duration-300 hover:scale-110"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 text-center transition-colors duration-300 hover:text-white">
                {tutor.name}
              </h3>
              <p className="text-gray-600 text-center transition-colors duration-300 hover:text-white">
                {tutor.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TutorList;
