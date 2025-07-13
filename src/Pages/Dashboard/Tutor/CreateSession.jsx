import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../Hook/UseAuth";
import Swal from "sweetalert2";

const CreateStudySession = () => {
    const { user } = UseAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("🟡 Form data before POST:", data);
        const sessionData = {
            ...data,
            tutorName: user?.displayName || "Unknown Tutor",
            tutorEmail: user?.email || "Unknown Email",
            registrationFee: 0,
            status: "pending",
        };

        try {
            const axiosSecure = UseAxiosSecure();
            const res = await axiosSecure.post("/sessions", sessionData); // POST to MongoDB backend
            console.log("Response from server:", res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Session Created!",
                    text: "Your study session has been successfully created.",
                    confirmButtonColor: "#2563eb", // Tailwind blue-600
                });
                reset();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again!",
                });
            }
        } catch (err) {
            console.error("Error submitting session:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: " Failed to create session!",
            });
        }
    };

    return (
        <div className="max-w-3x mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Create Study Session
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Session Title */}
                <div>
                    <label className="block mb-1 font-medium">Session Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Session title is required" })}
                        className="w-full px-4 py-2 border rounded"
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                </div>

                {/* Tutor Name (Read-only) */}
                <div>
                    <label className="block mb-1 font-medium">Tutor Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-100 border rounded"
                    />
                </div>

                {/* Tutor Email (Read-only) */}
                <div>
                    <label className="block mb-1 font-medium">Tutor Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-100 border rounded"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Session Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full px-4 py-2 border rounded"
                        rows="4"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Registration Start Date</label>
                        <input
                            type="date"
                            {...register("registrationStart", { required: true })}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Registration End Date</label>
                        <input
                            type="date"
                            {...register("registrationEnd", { required: true })}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Class Start Date</label>
                        <input
                            type="date"
                            {...register("classStart", { required: true })}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Class End Date</label>
                        <input
                            type="date"
                            {...register("classEnd", { required: true })}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                </div>

                {/* Duration */}
                <div>
                    <label className="block mb-1 font-medium">Session Duration</label>
                    <input
                        type="text"
                        {...register("duration", { required: "Duration is required" })}
                        placeholder="e.g., 6 weeks"
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>

                {/* Registration Fee (read-only) */}
                <div>
                    <label className="block mb-1 font-medium">Registration Fee</label>
                    <input
                        type="number"
                        value="0"
                        readOnly
                        className="w-full px-4 py-2 bg-gray-100 border rounded"
                    />
                </div>

                {/* Status (read-only) */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <input
                        type="text"
                        value="pending"
                        readOnly
                        className="w-full px-4 py-2 bg-gray-100 border rounded"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {isSubmitting ? "Creating..." : "Create Session"}
                </button>
            </form>
        </div>
    );
};

export default CreateStudySession;
