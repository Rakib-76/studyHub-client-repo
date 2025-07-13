import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useForm } from "react-hook-form";

const AdminViewSessions = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ["admin-sessions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/sessions");
      return res.data;
    },
  });

  const handleApprove = (id) => {
    setSelectedSessionId(id);
    Swal.fire({
      title: "Approve Session",
      html: `
        <label class="block text-left mb-1 font-medium">Is it Free or Paid?</label>
        <select id="feeType" class="swal2-select w-full mb-2">
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <input type="number" id="feeAmount" placeholder="Enter amount (if paid)" class="swal2-input" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const feeType = document.getElementById("feeType").value;
        const amount = document.getElementById("feeAmount").value;
        return { fee: feeType === "free" ? 0 : Number(amount) };
      },
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/admin/sessions/approve/${id}`, result.value);
          Swal.fire("Approved!", "Session has been approved.", "success");
          refetch();
        } catch (error) {
          console.error("Approval failed:", error);
          Swal.fire("Error", "Failed to approve session.", "error");
        }
      }
    });
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting this session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/admin/sessions/reject/${id}`);
        Swal.fire("Rejected!", "Session has been removed.", "success");
        refetch();
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to reject session", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This session will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/admin/sessions/${id}`);
      Swal.fire("Deleted!", "Session deleted successfully.", "success");
      refetch();
    }
  };

  const handleUpdate = async (id) => {
    const { value: newTitle } = await Swal.fire({
      title: "Update Session Title",
      input: "text",
      inputLabel: "Enter new title",
      showCancelButton: true,
    });

    if (newTitle) {
      await axiosSecure.patch(`/admin/sessions/${id}`, { title: newTitle });
      Swal.fire("Updated!", "Session title updated.", "success");
      refetch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage All Study Sessions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session._id} className="bg-white rounded-lg shadow p-4 border">
            <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
            <p className="text-sm mb-2">Tutor: {session.tutorName}</p>
            <p className="text-sm text-gray-500 mb-2">{session.description?.slice(0, 100)}...</p>
            <p className="text-sm mb-2">
              Status:{" "}
              <span
                className={`font-medium ${
                  session.status === "pending"
                    ? "text-yellow-600"
                    : session.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {session.status}
              </span>
            </p>
            {session.status === "pending" && (
              <div className="flex gap-3 mt-3">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  onClick={() => handleApprove(session._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  onClick={() => handleReject(session._id)}
                >
                  Reject
                </button>
              </div>
            )}

            {session.status === "approved" && (
              <div className="flex gap-3 mt-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  onClick={() => handleUpdate(session._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  onClick={() => handleDelete(session._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminViewSessions;
