import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";
import useAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../Hook/UseAuth";
import UseUserRole from "../../../hooks/UseUserRole";
import Swal from "sweetalert2"; // ✅ Added SweetAlert

const SessionDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const { user } = UseAuth();
  const { role } = UseUserRole(); // returns ['student' | 'admin' | 'tutor']
  const [session, setSession] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/sessions/${id}`).then((res) => {
      setSession(res.data);
    });
  }, [id, axiosPublic]);

  if (!session) return <div className="text-center mt-20">Loading...</div>;

  const {
    title,
    tutorName,
    description,
    registrationStart,
    registrationEnd,
    classStart,
    classEnd,
    duration,
    fee,
    rating = 0,
    reviews = [],
  } = session;

  const regClosed = new Date(registrationEnd) < new Date();
  const disabled =
    !user || regClosed || role === "admin" || role === "tutor";

  // ✅ Booking Function
  const handleBooking = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please login to book this session", "warning");
      return;
    }

    const bookingInfo = {
      studentEmail: user.email,
      sessionId: id,
      sessionTitle: title,
      sessionDescription: description,
      bookedAt: new Date(),
    };

    try {
      const res = await axiosPublic.post("/bookings", bookingInfo);
      if (res.data.insertedId) {
        Swal.fire("Success", "You have successfully booked this session!", "success");
      } else {
        Swal.fire("Info", "You already booked this session.", "info");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire("Error", "Something went wrong while booking.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>

      <p className="text-gray-600 mb-2">
        <strong>Tutor:</strong> {tutorName}
      </p>

      <div className="flex items-center mb-4 gap-1">
        <strong>Rating:</strong>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">({rating} / 5)</span>
      </div>

      <p className="text-gray-700 mb-6">{description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-gray-700">
        <p>
          <strong>Registration:</strong>{" "}
          {format(new Date(registrationStart), "MMM dd")} -{" "}
          {format(new Date(registrationEnd), "MMM dd, yyyy")}
        </p>
        <p>
          <strong>Class Period:</strong>{" "}
          {format(new Date(classStart), "MMM dd")} -{" "}
          {format(new Date(classEnd), "MMM dd, yyyy")}
        </p>
        <p>
          <strong>Duration:</strong> {duration} days
        </p>
        <p>
          <strong>Registration Fee:</strong>{" "}
          {fee && fee > 0 ? `$${fee}` : "Free"}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Reviews:</h3>
        {reviews.length > 0 ? (
          <ul className="space-y-2">
            {reviews.map((review, idx) => (
              <li
                key={idx}
                className="bg-gray-100 p-3 rounded shadow-sm text-sm"
              >
                <strong>{review.name}:</strong> {review.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* ✅ Book Button with Booking Logic */}
      <button
        onClick={handleBooking} // ✅ Booking function
        disabled={disabled}
        className={`px-6 py-2 text-white font-medium rounded ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {regClosed ? "Registration Closed" : "Book Now"}
      </button>
    </div>
  );
};

export default SessionDetails;
