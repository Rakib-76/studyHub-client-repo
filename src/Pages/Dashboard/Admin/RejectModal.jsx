import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const RejectModal = ({ isOpen, onClose, sessionId, refetch, axiosSecure }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.patch(`/sessions/reject/${sessionId}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Rejected", "Study session rejected!", "success");
                reset();
                onClose();
                refetch(); // refresh list
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Rejection failed!", "error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Reject Study Session</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label>Rejection Reason</label>
                        <input
                            {...register("reason", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Reason for rejection"
                        />
                    </div>
                    <div>
                        <label>Feedback</label>
                        <textarea
                            {...register("feedback", { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Optional feedback"
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="btn btn-outline">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-error text-white">
                            Submit Rejection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RejectModal;
