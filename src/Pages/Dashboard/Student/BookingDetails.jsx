import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";
// import useAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../Hook/UseAuth";
import UseUserRole from "../../../hooks/UseUserRole";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const BookingDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const { role } = UseUserRole(); // 'student' | 'admin' | 'tutor'
  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure.get(`/sessions/${id}`).then((res) => {
      setSession(res.data);
    });
    axiosSecure.get(`/reviews/${id}`).then((res) => {
      setReviews(res.data);
    });
  }, [id, axiosSecure]);

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
  } = session;

  const regClosed = new Date(registrationEnd) < new Date();
  const disabled = !user || regClosed || role === "admin" || role === "tutor";

  // Handle Booking
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
      const res = await axiosSecure.post("/bookings", bookingInfo);
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

  //  Handle Review Submission
  const onSubmitReview = async (data) => {
    if (!user) {
      return Swal.fire("Login Required", "Please login first", "warning");
    }

    const reviewDoc = {
      sessionId: id,
      name: user.displayName,
      email: user.email,
      rating: parseInt(data.rating),
      comment: data.comment,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewDoc);
      if (res.data.insertedId) {
        Swal.fire("Thanks!", "Review submitted!", "success");
        setReviews([reviewDoc, ...reviews]);
        reset();
      }
    } catch (error) {
      console.error("Review error:", error);
      Swal.fire("Oops!", "Failed to submit review", "error");
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
          <strong>Registration Fee:</strong> {fee && fee > 0 ? `$${fee}` : "Free"}
        </p>
      </div>

      {/*  Book Button */}
      {/* <button
        onClick={handleBooking}
        disabled={disabled}
        className={`px-6 py-2 text-white font-medium rounded ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {regClosed ? "Registration Closed" : "Book Now"}
      </button> */}

      {/*  Reviews */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>

        {reviews.length > 0 ? (
          <ul className="space-y-2 mb-6">
            {reviews.map((review, idx) => (
              <li key={idx} className="bg-gray-100 p-3 rounded shadow-sm text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{review.name}</span>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}

       {/* review form */}
        {role === "student" && !regClosed && (
          <form
            onSubmit={handleSubmit(onSubmitReview)}
            className="space-y-4 bg-white p-4 rounded shadow-md"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select {...register("rating", { required: true })} className="input input-bordered w-full max-w-xs">
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} Star</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                {...register("comment", { required: true })}
                rows={3}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
