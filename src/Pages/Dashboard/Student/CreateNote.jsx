import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../../Hook/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const CreateNote = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const noteDoc = {
      email: user.email,
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/notes", noteDoc);
      if (res.data.insertedId) {
        Swal.fire("Success!", "Note created successfully", "success");
        reset();
      }
    } catch (err) {
      console.error("Create note error:", err);
      Swal.fire("Oops!", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Note Title"
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write your note here"
            rows={5}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
